(() => {
  const zones = Object.freeze([
    { id: 'A', name: 'Escenario principal' },
    { id: 'B', name: 'Piso de exhibición' },
    { id: 'C', name: 'Acceso y registro' },
    { id: 'D', name: 'Producción' },
  ]);
  const zoneIds = new Set(zones.map((zone) => zone.id));
  const admissionRoles = Object.freeze({ a: 'Asistente', e: 'Expositor', p: 'Personal' });
  const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  const samples = [
    {
      id: '88a2bc11-6fd2-451b-a8e4-60693eb48100',
      asunto: 'EXPO1|O|D|n|Radio de producción con batería baja',
    },
    {
      id: '88a2bc11-6fd2-451b-a8e4-60693eb48101',
      asunto: 'EXPO1|C|88a2bc11-6fd2-451b-a8e4-60693eb48100',
    },
    {
      id: '88a2bc11-6fd2-451b-a8e4-60693eb48102',
      asunto: 'EXPO1|O|C|n|Faltan gafetes en la mesa de registro',
    },
    {
      id: '88a2bc11-6fd2-451b-a8e4-60693eb48103',
      asunto: 'EXPO1|O|A|u|El proyector principal perdió señal',
    },
  ];
  function decode(row) {
    if (!row || typeof row.id !== 'string' || !uuid.test(row.id) || typeof row.asunto !== 'string')
      return null;
    const opened = /^EXPO1\|O\|([ABCD])\|([nu])\|([\s\S]{1,85})$/.exec(row.asunto);
    if (opened && opened[3].trim()) {
      return { id: row.id, zone: opened[1], priority: opened[2], description: opened[3] };
    }
    const reference = row.asunto.startsWith('EXPO1|C|') ? row.asunto.slice(8) : '';
    return uuid.test(reference) ? { closes: reference } : null;
  }
  function project(rows) {
    const incidents = new Map();
    const closed = new Set();
    for (const row of rows) {
      const event = decode(row);
      if (!event) continue;
      if (event.closes) closed.add(event.closes);
      else if (!incidents.has(event.id)) incidents.set(event.id, event);
    }
    return Array.from(incidents.values(), (incident) => ({
      ...incident,
      resolved: closed.has(incident.id),
    })).reverse();
  }
  function admissionSubject({ name, role }) {
    const clean = name.trim().replace(/\s+/g, ' ');
    if (
      !clean ||
      clean.length > 64 ||
      /[|\u0000-\u001f\u007f]/.test(clean) ||
      !Object.hasOwn(admissionRoles, role)
    ) {
      throw new Error('Escribe un nombre de 1 a 64 caracteres y elige un tipo de acreditación.');
    }
    return ['EXPO1', 'A', role, clean].join('|');
  }
  function admissions(rows) {
    return rows
      .flatMap((row) => {
        const entry = /^EXPO1\|A\|([aep])\|([^|\r\n]{1,64})$/.exec(row.asunto);
        return entry && entry[2].trim() ? [{ name: entry[2], role: admissionRoles[entry[1]] }] : [];
      })
      .reverse();
  }
  globalThis.ExpoData = { zones, zoneIds, samples, uuid, project, admissionSubject, admissions };
})();
