/* Punto de trabajo del laboratorio: crear y resolver incidentes. */
(() => {
  let pending;
  let busy = false;
  async function append(item) {
    if (busy) throw new Error('Espera a que termine el envío.');
    busy = true;
    try {
      return await ExpoService.append(item);
    } finally {
      busy = false;
    }
  }

  // Un mismo evento genera el mismo ID desde cualquier dispositivo.
  async function eventId(action, id) {
    const bytes = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode('mision-expo:' + action + ':' + id),
    );
    const hex = Array.from(new Uint8Array(bytes), (byte) =>
      byte.toString(16).padStart(2, '0'),
    ).join('');
    return hex.slice(0, 8) +
      '-' +
      hex.slice(8, 12) +
      '-5' +
      hex.slice(13, 16) +
      '-8' +
      hex.slice(17, 20) +
      '-' +
      hex.slice(20, 32);
  }

  globalThis.ExpoOperations = {
    reset() {
      pending = undefined;
    },
    async report({ zone, priority, description }) {
      const clean = description.trim();
      if (
        !ExpoData.zoneIds.has(zone) ||
        !['n', 'u'].includes(priority) ||
        clean.length < 1 ||
        clean.length > 85
      ) {
        throw new Error('Elige una zona y escribe una descripción de 1 a 85 caracteres.');
      }
      const asunto = ['EXPO1', 'O', zone, priority, clean].join('|');
      if (pending?.asunto !== asunto) pending = { id: crypto.randomUUID(), asunto };
      const result = await append(pending);
      pending = undefined;
      return result;
    },
    async resolve(id) {
      if (!ExpoData.uuid.test(id)) throw new Error('Selecciona un incidente válido.');
      const closeId = await eventId('close', id);
      return append({ id: closeId, asunto: 'EXPO1|C|' + id });
    },
  };
})();
