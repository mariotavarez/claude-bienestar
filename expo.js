(() => {
  const select = (query) => document.querySelector(query);
  const { zones, project } = ExpoData;
  const zoneGrid = select('#zone-grid');
  const hall = select('.plan-hall');
  const activity = select('#activity-list');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const reportDialog = select('#report-dialog');
  const connectionDialog = select('#connection-dialog');
  const reportForm = select('#report-form');
  const connectionForm = select('#connection-form');
  const admissionDialog = select('#admission-dialog');
  const admissionForm = select('#admission-form');
  const admissionList = select('#admission-list');
  const state = {
    rows: [],
    signature: '',
    zone: '',
    filter: 'all',
    busy: false,
    refreshing: false,
    revision: 0,
  };
  let noticeTimeout;
  let pendingAdmission;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function icon(symbol) {
    const namespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(namespace, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(namespace, 'use');
    use.setAttribute('href', '#i-' + symbol);
    svg.append(use);
    return svg;
  }
  function zonePhoto(id, className) {
    const photo = element('img', className);
    photo.src = 'images/zone-' + id.toLowerCase() + '.webp';
    photo.width = 840;
    photo.height = 520;
    photo.alt = '';
    photo.loading = 'lazy';
    return photo;
  }
  function flash(text) {
    clearTimeout(noticeTimeout);
    select('#notice').textContent = text;
    noticeTimeout = setTimeout(() => {
      select('#notice').textContent = '';
    }, 5500);
  }
  function updateRows(rows) {
    const signature = JSON.stringify(rows);
    if (state.signature === signature) return;
    state.signature = signature;
    state.rows = rows;
    render();
  }
  function visibleIncidents(incidents) {
    return incidents.filter((item) => {
      if (state.zone && item.zone !== state.zone) return false;
      if (state.filter === 'urgent') return !item.resolved && item.priority === 'u';
      return state.filter === 'all' || item.resolved === (state.filter === 'resolved');
    });
  }

  const downloadReport = select('#download-report');
  function csvCell(value) {
    const cell = String(value);
    const safe = /^[\s\uFEFF]*[=+\-@]|^[\t\r\n]/u.test(cell) ? "'" + cell : cell;
    return '"' + safe.replaceAll('"', '""') + '"';
  }

  downloadReport.addEventListener('click', () => {
    const incidents = visibleIncidents(project(state.rows));
    if (!incidents.length) return;
    const rows = incidents.map((item) => [
      zones.find((zone) => zone.id === item.zone).name,
      item.priority === 'u' ? 'Urgente' : 'Normal',
      item.resolved ? 'Resuelto' : 'Abierto',
      item.description,
    ]);
    const csv = [['Zona', 'Prioridad', 'Estado', 'Descripción'], ...rows]
      .map((row) => row.map(csvCell).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
    const link = element('a');
    link.href = url;
    link.download = 'mision-expo-incidentes.csv';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    flash('Reporte CSV descargado con los incidentes visibles.');
  });


  function render() {
    const incidents = project(state.rows);
    const open = incidents.filter((incident) => !incident.resolved);
    const focused = document.activeElement?.dataset;
    const previousRooms = new Map(
      [...zoneGrid.querySelectorAll('[data-zone-button]')].map((room) => [
        room.dataset.zoneButton,
        room.dataset.status,
      ]),
    );
    select('#zones-ready').textContent =
      zones.length - new Set(open.map((item) => item.zone)).size + ' / ' + zones.length;
    select('#incident-count').textContent = open.length;
    select('#resolved-count').textContent = incidents.length - open.length;
    const people = ExpoData.admissions(state.rows);
    select('#admission-count').textContent =
      people.length === 1 ? '1 persona en la lista' : people.length + ' personas en la lista';
    select('#admission-empty').hidden = people.length > 0;
    admissionList.replaceChildren(
      ...people.map((person) => {
        const entry = element('li', 'admission-entry');
        entry.append(element('strong', '', person.name), element('span', '', person.role));
        return entry;
      }),
    );
    zoneGrid.replaceChildren(
      hall,
      ...zones.map((zone) => {
        const pending = open.filter((item) => item.zone === zone.id);
        const urgent = pending.some((item) => item.priority === 'u');
        const room = element('button', 'zone');
        const status = urgent ? 'alert' : pending.length ? 'watch' : 'ok';
        const label = { alert: 'Urgente', watch: 'Atención', ok: 'Operativa' }[status];
        room.type = 'button';
        room.dataset.zoneButton = zone.id;
        room.dataset.status = status;
        if (previousRooms.has(zone.id) && previousRooms.get(zone.id) !== status) {
          room.classList.add('zone-updated');
        }
        room.setAttribute('aria-pressed', String(state.zone === zone.id));
        room.setAttribute('aria-controls', 'activity-list');
        const media = element('span', 'zone-media');
        media.append(zonePhoto(zone.id, 'zone-photo'));
        const body = element('span', 'zone-body');
        const arrow = element('span', 'zone-arrow');
        arrow.append(icon('arrow'));
        body.append(
          element('span', 'zone-label', 'Zona ' + zone.id),
          element('strong', '', zone.name),
          element('span', 'zone-state status-mark status-' + status, label),
          arrow,
        );
        room.append(media, body);
        return room;
      }),
    );
    const zoneFilter = select('#zone-filter');
    zoneFilter.hidden = !state.zone;
    zoneFilter.firstElementChild.textContent =
      zones.find((zone) => zone.id === state.zone)?.name || '';
    filters.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter)),
    );
    const visible = visibleIncidents(incidents);
    downloadReport.disabled = visible.length === 0;
    activity.replaceChildren(
      ...visible.map((item) => {
        const row = element('article', 'incident');
        const status = item.resolved ? 'ok' : item.priority === 'u' ? 'alert' : 'watch';
        const zone = zones.find((zone) => zone.id === item.zone);
        const label = item.resolved ? 'Resuelto' : item.priority === 'u' ? 'Urgente' : 'Abierto';
        const details = element('p', 'incident-meta');
        details.append(
          element('span', 'incident-zone', 'Zona ' + zone.id + ' / ' + zone.name),
          element('span', 'status-mark status-' + status, label),
        );
        const body = element('div', 'incident-body');
        body.append(element('h3', '', item.description), details);
        row.append(zonePhoto(zone.id, 'incident-photo'), body);
        if (!item.resolved) {
          const resolve = element('button', '', 'Marcar resuelto');
          resolve.type = 'button';
          resolve.dataset.resolve = item.id;
          resolve.setAttribute('aria-label', 'Marcar resuelto: ' + item.description);
          resolve.disabled = state.busy;
          resolve.prepend(icon('check'));
          row.append(resolve);
        }
        return row;
      }),
    );
    if (!visible.length) {
      const empty = element('div', 'empty');
      empty.append(
        element('strong', '', 'Aquí no hay incidentes'),
        element(
          'p',
          '',
          incidents.length
            ? 'Prueba con otro filtro.'
            : 'Registra el primer incidente para que aparezca en el tablero.',
        ),
      );
      activity.append(empty);
    }
    if (focused?.zoneButton)
      zoneGrid.querySelector('[data-zone-button="' + focused.zoneButton + '"]')?.focus();
    if (focused?.resolve)
      (
        activity.querySelector('[data-resolve="' + focused.resolve + '"]') ||
        filters.find((button) => button.dataset.filter === state.filter)
      )?.focus({ preventScroll: true });
  }

  async function refresh() {
    if (state.busy || state.refreshing) return;
    state.refreshing = true;
    const revision = state.revision;
    try {
      const rows = await ExpoService.list();
      if (revision === state.revision) {
        updateRows(rows);
        showConnection();
      }
    } catch {
      if (revision === state.revision && ExpoService.shared()) {
        select('#session-state').classList.remove('connected');
        select('#session-label').textContent = 'Sin actualizar';
      }
    } finally {
      state.refreshing = false;
    }
  }
  function showConnection() {
    const shared = ExpoService.shared();
    const indicator = select('#session-state');
    indicator.classList.toggle('connected', shared);
    select('#session-label').textContent = shared ? 'Aula conectada' : 'Simulación local';
    select('#connection-label').textContent = shared ? 'Cambiar conexión' : 'Conectar aula';
    select('#leave-room').hidden = !shared;
  }
  function showError(form, message = '') {
    const error = form.querySelector('[data-error]');
    error.textContent = message;
    error.hidden = !message;
  }
  async function perform(task, form) {
    if (state.busy) return;
    state.busy = true;
    state.revision++;
    const buttons = [...document.querySelectorAll('dialog button, [data-resolve], [data-arrive]')];
    buttons.forEach((button) => {
      button.disabled = true;
    });
    try {
      if (form) showError(form);
      await task();
    } catch (error) {
      if (form) showError(form, error.message);
      else flash(error.message);
    } finally {
      state.busy = false;
      document.querySelectorAll('dialog button, [data-resolve], [data-arrive]').forEach((button) => {
        button.disabled = false;
      });
    }
  }
  function recordSaved(record) {
    if (!state.rows.some((row) => row.id === record.id)) updateRows([...state.rows, record]);
  }

  const zoneValue = select('#zone');
  const zonePicker = select('#zone-picker');
  const zoneList = select('#zone-options');
  const zoneOptions = zones.map((zone) => {
    const option = element('li', 'zone-option');
    option.id = 'zone-option-' + zone.id;
    option.dataset.zone = zone.id;
    option.setAttribute('role', 'option');
    option.append(
      element('span', 'zone-option-code', zone.id),
      element('span', 'zone-option-name', zone.name),
    );
    return option;
  });
  zoneList.replaceChildren(...zoneOptions);
  let activeOption = 0;

  function chooseZone(id) {
    const zone = zones.find((item) => item.id === id) || zones[0];
    zoneValue.value = zone.id;
    select('#zone-code').textContent = zone.id;
    select('#zone-name').textContent = zone.name;
    zoneOptions.forEach((option) =>
      option.setAttribute('aria-selected', String(option.dataset.zone === zone.id)),
    );
  }
  function highlightZone(index) {
    activeOption = Math.min(zoneOptions.length - 1, Math.max(0, index));
    zoneOptions.forEach((option, position) =>
      option.classList.toggle('active', position === activeOption),
    );
    zonePicker.setAttribute('aria-activedescendant', zoneOptions[activeOption].id);
    zoneOptions[activeOption].scrollIntoView({ block: 'nearest' });
  }
  function toggleZoneList(open) {
    zoneList.hidden = !open;
    zonePicker.setAttribute('aria-expanded', String(open));
    if (open) highlightZone(zones.findIndex((zone) => zone.id === zoneValue.value));
    else zonePicker.removeAttribute('aria-activedescendant');
  }

  zonePicker.addEventListener('click', () => toggleZoneList(zoneList.hidden));
  zonePicker.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      toggleZoneList(false);
      return;
    }
    const open = !zoneList.hidden;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (open) highlightZone(activeOption + (event.key === 'ArrowDown' ? 1 : -1));
        else toggleZoneList(true);
        break;
      case 'Home':
      case 'End':
        if (!open) return;
        highlightZone(event.key === 'Home' ? 0 : zoneOptions.length - 1);
        break;
      case 'Enter':
      case ' ':
        if (!open) return;
        chooseZone(zoneOptions[activeOption].dataset.zone);
        toggleZoneList(false);
        break;
      case 'Escape':
        if (!open) return;
        toggleZoneList(false);
        break;
      default:
        return;
    }
    event.preventDefault();
  });
  zoneList.addEventListener('mousedown', (event) => event.preventDefault());
  zoneList.addEventListener('click', (event) => {
    const option = event.target.closest('.zone-option');
    if (!option) return;
    chooseZone(option.dataset.zone);
    toggleZoneList(false);
    zonePicker.focus();
  });
  reportDialog.addEventListener('click', (event) => {
    if (!event.target.closest('.zone-dropdown')) toggleZoneList(false);
  });
  reportDialog.addEventListener('close', () => toggleZoneList(false));

  select('#report-open').addEventListener('click', () => {
    if (state.busy) return;
    chooseZone(state.zone || zoneValue.value);
    showError(reportForm);
    reportDialog.showModal();
  });
  select('#connection-open').addEventListener('click', () => {
    if (state.busy) return;
    showError(connectionForm);
    connectionForm.reset();
    connectionDialog.showModal();
  });
  select('#admission-open').addEventListener('click', () => {
    if (state.busy) return;
    showError(admissionForm);
    admissionDialog.showModal();
  });
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog
      .querySelectorAll('[data-close]')
      .forEach((button) => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('cancel', (event) => {
      if (state.busy) event.preventDefault();
    });
  });
  connectionDialog.addEventListener('close', () => connectionForm.reset());
  reportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(reportForm));
    perform(async () => {
      const result = await ExpoOperations.report(form);
      state.zone = '';
      state.filter = 'all';
      recordSaved(result);
      reportForm.reset();
      chooseZone();
      reportDialog.close();
      flash('Incidente registrado en el tablero.');
    }, reportForm).then(refresh);
  });
  admissionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(admissionForm));
    perform(async () => {
      const asunto = ExpoData.admissionSubject(form);
      if (pendingAdmission?.asunto !== asunto)
        pendingAdmission = { id: crypto.randomUUID(), asunto };
      recordSaved(await ExpoService.append(pendingAdmission));
      pendingAdmission = undefined;
      admissionForm.reset();
      admissionDialog.close();
      flash('Acreditación guardada.');
    }, admissionForm).then(refresh);
  });
  connectionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const key = new FormData(connectionForm).get('key');
    perform(async () => {
      const rows = await ExpoService.connect(key);
      ExpoOperations.reset();
      pendingAdmission = undefined;
      updateRows(rows);
      showConnection();
      connectionDialog.close();
      flash('Aula conectada. El tablero consulta el espacio del grupo.');
    }, connectionForm);
  });
  select('#leave-room').addEventListener('click', () => {
    ExpoOperations.reset();
    pendingAdmission = undefined;
    state.revision++;
    updateRows(ExpoService.disconnect());
    showConnection();
    connectionDialog.close();
    flash('Volviste a la simulación local.');
  });
  zoneGrid.addEventListener('click', (event) => {
    const room = event.target.closest('[data-zone-button]');
    if (!room) return;
    state.zone = state.zone === room.dataset.zoneButton ? '' : room.dataset.zoneButton;
    render();
    if (state.zone) select('#activity-title').focus();
  });
  select('#clear-zone').addEventListener('click', () => {
    state.zone = '';
    render();
    filters.find((button) => button.dataset.filter === state.filter)?.focus();
  });
  filters.forEach((button) =>
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      render();
    }),
  );
  activity.addEventListener('click', (event) => {
    const id = event.target.closest('[data-resolve]')?.dataset.resolve;
    if (!id) return;
    perform(async () => {
      recordSaved(await ExpoOperations.resolve(id));
      flash('Incidente resuelto. Mapa actualizado.');
    }).then(refresh);
  });
  function syncNavigation() {
    const section = location.hash || '#contenido';
    document.querySelectorAll('.site-nav a').forEach((item) => {
      if (item.hash === section) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
  }
  addEventListener('hashchange', syncNavigation);
  select('.map-caption a').addEventListener('click', () => {
    select('#creditos').open = true;
  });
  syncNavigation();
  addEventListener('storage', (event) => {
    if (!ExpoService.shared() && ExpoService.localChange(event.key)) refresh();
  });
  setInterval(() => {
    if (ExpoService.shared() && !document.hidden) refresh();
  }, 4000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });
  refresh();
})();
