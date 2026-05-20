// SOS Tactical Support Scenarios
export const SOS_PHONE = '6145023232';

export const sosScenarios = [
  {
    id: 'green',
    label: 'Caele, haz segunda',
    emoji: '🟢',
    color: '#00ff41',
    colorName: 'green',
    code: 'CÓDIGO VERDE',
    message: '🟢 CÓDIGO VERDE: Necesito refuerzo aquí. Ven a hacerme segunda.',
    description: 'Pide refuerzo a tu wingman'
  },
  {
    id: 'yellow',
    label: 'Saca a la mala tercio',
    emoji: '🟡',
    color: '#ffd700',
    colorName: 'yellow',
    code: 'CÓDIGO AMARILLO',
    message: '🟡 CÓDIGO AMARILLO: Necesito que me ayudes a sacar al tercio discretamente.',
    description: 'Elimina interferencia de terceros'
  },
  {
    id: 'orange',
    label: 'Ella se siente incómoda',
    emoji: '🟠',
    color: '#ff8c00',
    colorName: 'orange',
    code: 'CÓDIGO NARANJA',
    message: '🟠 CÓDIGO NARANJA: La situación se puso incómoda. Ven con un pretexto para irnos.',
    description: 'Salida táctica necesaria'
  },
  {
    id: 'red',
    label: 'Salió el novio/controlador',
    emoji: '🔴',
    color: '#ff0040',
    colorName: 'red',
    code: 'CÓDIGO ROJO',
    message: '🔴 CÓDIGO ROJO: Situación tensa. Ven ya, necesito salir de aquí.',
    description: 'Evacuación inmediata'
  }
];
