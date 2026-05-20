import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          setLoading(false);
          setError(err.message);
          // Return null location if geolocation fails
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000
        }
      );
    });
  }, []);

  const getGoogleMapsLink = useCallback((coords) => {
    if (!coords) return '';
    return `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
  }, []);

  return { getLocation, getGoogleMapsLink, loading, error };
}
