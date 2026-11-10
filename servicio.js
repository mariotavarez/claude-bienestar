/* Infraestructura preparada. La conexión vive solo en la memoria de esta pestaña. */
(() => {
  const endpoint = location.pathname.startsWith('/materiales/modulo-3/mision-expo/')
    ? '/api/module-3-lab'
    : 'https://imaginatec.tech/api/module-3-lab';
  const prefix = 'mision-expo-v1:evento:';
  let key = '';
  const ephemeral = new Map();

  function localRows() {
    const records = new Map(ExpoData.samples.map((record) => [record.id, record]));
    try {
      for (let index = 0; index < localStorage.length; index++) {
        const name = localStorage.key(index);
        if (!name?.startsWith(prefix)) continue;
        const event = JSON.parse(localStorage.getItem(name));
        if (event && name === prefix + event.id) records.set(event.id, event);
      }
    } catch {
      // Algunos navegadores bloquean el almacenamiento al abrir archivos locales.
    }
    for (const [id, record] of ephemeral) records.set(id, record);
    return [...records.values()];
  }

  async function request(connection, item) {
    const headers = { Authorization: 'Bearer ' + connection };
    if (item) headers['Content-Type'] = 'application/json';
    const response = await fetch(endpoint, {
      method: item ? 'POST' : 'GET',
      headers,
      credentials: 'omit',
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
      body: item ? JSON.stringify(item) : undefined,
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error || 'El aula no respondió. Intenta de nuevo.');
    if (item ? body?.id !== item.id : !Array.isArray(body))
      throw new Error('El aula devolvió una respuesta inesperada.');
    return body;
  }

  globalThis.ExpoService = {
    shared: () => Boolean(key),
    localChange: (name) => name === null || name.startsWith(prefix),
    async connect(value) {
      const candidate = value.trim();
      if (!/^[a-f0-9]{64}$/.test(candidate))
        throw new Error('Pega la conexión completa del módulo 3.');
      const rows = await request(candidate);
      key = candidate;
      return rows;
    },
    disconnect() {
      key = '';
      return localRows();
    },
    async list() {
      return key ? request(key) : localRows();
    },
    async append(item) {
      if (key) return request(key, item);
      const previous = localRows().find((row) => row.id === item.id);
      if (previous && previous.asunto !== item.asunto)
        throw new Error('Ese ID corresponde a otro evento.');
      if (!previous) {
        try {
          localStorage.setItem(prefix + item.id, JSON.stringify(item));
        } catch {
          ephemeral.set(item.id, item);
        }
      }
      return item;
    },
  };
})();
