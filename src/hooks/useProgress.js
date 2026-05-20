import { useState, useEffect, useCallback } from 'react';
import { missions as staticMissions } from '../data/missions';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'socialxp_progress';
const CUSTOM_MISSIONS_KEY = 'socialxp_custom_missions';

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function loadCustomMissions() {
  try {
    const stored = localStorage.getItem(CUSTOM_MISSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);
  const [customMissions, setCustomMissions] = useState(loadCustomMissions);
  const [supabaseMissions, setSupabaseMissions] = useState({});
  const isConfigured = isSupabaseConfigured();

  // Combine static and custom missions
  const allMissions = [...staticMissions, ...customMissions];

  // Save to localStorage whenever local progress changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Sync with Supabase on mount / config change
  useEffect(() => {
    if (!isConfigured) return;

    async function syncProgress() {
      try {
        // 1. Fetch missions from Supabase to build the UUID mapping
        const { data: dbMissions, error: missionsError } = await supabase
          .from('missions')
          .select('id, fase, orden');

        if (missionsError) throw missionsError;

        const mapping = {};
        dbMissions.forEach(m => {
          mapping[`${m.fase}-${m.orden}`] = m.id;
        });
        setSupabaseMissions(mapping);

        // 2. Fetch user progress from Supabase
        const { data: dbProgress, error: progressError } = await supabase
          .from('user_progress')
          .select('mission_id, completado, fecha')
          .eq('user_id', 'local_user');

        if (progressError) throw progressError;

        const remoteCompleted = new Set(
          dbProgress
            .filter(p => p.completado)
            .map(p => p.mission_id)
        );

        // Build lookup from UUID to local static mission ID
        const uuidToLocalId = {};
        dbMissions.forEach(m => {
          const localMission = staticMissions.find(lm => lm.fase === m.fase && lm.orden === m.orden);
          if (localMission) {
            uuidToLocalId[m.id] = localMission.id;
          }
        });

        // Merge remote progress to local state
        const mergedProgress = { ...progress };
        let hasChanges = false;

        remoteCompleted.forEach(uuid => {
          const localId = uuidToLocalId[uuid];
          if (localId && !progress[localId]?.completado) {
            mergedProgress[localId] = {
              completado: true,
              fecha: new Date().toISOString()
            };
            hasChanges = true;
          }
        });

        // Upload any local static progress that is missing on Supabase
        const upserts = [];
        Object.keys(progress).forEach(localId => {
          if (progress[localId]?.completado && !localId.startsWith('custom-')) {
            const localMission = staticMissions.find(lm => lm.id === localId);
            if (localMission) {
              const uuid = mapping[`${localMission.fase}-${localMission.orden}`];
              const alreadyInDb = dbProgress.some(dp => dp.mission_id === uuid && dp.completado);
              if (uuid && !alreadyInDb) {
                upserts.push({
                  user_id: 'local_user',
                  mission_id: uuid,
                  completado: true,
                  fecha: progress[localId].fecha || new Date().toISOString()
                });
              }
            }
          }
        });

        if (upserts.length > 0) {
          const { error: upsertError } = await supabase
            .from('user_progress')
            .upsert(upserts);
          if (upsertError) {
            console.error('Error uploading local progress to Supabase:', upsertError);
          }
        }

        if (hasChanges) {
          setProgress(mergedProgress);
        }
      } catch (err) {
        console.error('Error during Supabase synchronization:', err);
      }
    }

    syncProgress();
  }, [isConfigured]);

  const completeMission = useCallback(async (missionId) => {
    // 1. Update local state immediately for fluid UX
    setProgress(prev => ({
      ...prev,
      [missionId]: {
        completado: true,
        fecha: new Date().toISOString()
      }
    }));

    // 2. Play subtle physical haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // 3. Sync to Supabase in the background if configured and not custom
    if (isConfigured && !missionId.startsWith('custom-')) {
      try {
        const localMission = staticMissions.find(m => m.id === missionId);
        if (!localMission) return;

        let dbMissionId = supabaseMissions[`${localMission.fase}-${localMission.orden}`];

        // Fetch UUID mapping if it is not loaded yet
        if (!dbMissionId) {
          const { data, error } = await supabase
            .from('missions')
            .select('id')
            .eq('fase', localMission.fase)
            .eq('orden', localMission.orden)
            .single();

          if (error) throw error;
          dbMissionId = data.id;

          setSupabaseMissions(prev => ({
            ...prev,
            [`${localMission.fase}-${localMission.orden}`]: dbMissionId
          }));
        }

        if (dbMissionId) {
          const { error } = await supabase
            .from('user_progress')
            .upsert({
              user_id: 'local_user',
              mission_id: dbMissionId,
              completado: true,
              fecha: new Date().toISOString()
            });

          if (error) throw error;
        }
      } catch (err) {
        console.error('Error syncing completed mission to Supabase:', err);
      }
    }
  }, [isConfigured, supabaseMissions]);

  const addCustomMission = useCallback((title, description, fase, xp) => {
    const id = `custom-${Date.now()}`;
    const newMission = {
      id,
      titulo: title,
      descripcion: description,
      fase: parseInt(fase, 10),
      orden: customMissions.length + 10, // Sort at the bottom of the list
      es_jefe: false,
      xp: parseInt(xp, 10) || 0,
      tip_ayuda: 'Misión personalizada por el usuario. ¡Excelente iniciativa para expandir tus habilidades sociales!',
      categoria_tip: 'General'
    };

    setCustomMissions(prev => {
      const updated = [...prev, newMission];
      localStorage.setItem(CUSTOM_MISSIONS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Auto complete the newly created custom mission
    setProgress(prev => ({
      ...prev,
      [id]: {
        completado: true,
        fecha: new Date().toISOString()
      }
    }));

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }, [customMissions]);

  const isMissionCompleted = useCallback((missionId) => {
    return progress[missionId]?.completado || false;
  }, [progress]);

  const getTotalXP = useCallback(() => {
    return allMissions.reduce((total, mission) => {
      if (progress[mission.id]?.completado) {
        return total + mission.xp;
      }
      return total;
    }, 0);
  }, [progress, allMissions]);

  const getMaxXP = useCallback(() => {
    return allMissions.reduce((total, mission) => total + mission.xp, 0);
  }, [allMissions]);

  const getPhaseProgress = useCallback((fase) => {
    const phaseMissions = allMissions.filter(m => m.fase === fase);
    const completed = phaseMissions.filter(m => progress[m.id]?.completado).length;
    return { completed, total: phaseMissions.length };
  }, [progress, allMissions]);

  const resetProgress = useCallback(async () => {
    // 1. Clear local states and localStorage keys
    setProgress({});
    setCustomMissions([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CUSTOM_MISSIONS_KEY);

    // 2. Delete progress in Supabase if configured
    if (isConfigured) {
      try {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', 'local_user');

        if (error) throw error;
      } catch (err) {
        console.error('Error resetting progress in Supabase:', err);
      }
    }
  }, [isConfigured]);

  return {
    progress,
    allMissions,
    completeMission,
    addCustomMission,
    isMissionCompleted,
    getTotalXP,
    getMaxXP,
    getPhaseProgress,
    resetProgress
  };
}
