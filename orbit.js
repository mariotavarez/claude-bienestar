'use strict';

const operations = ORBIT_FIXTURE.operations;
const segments = [['tech', 'Tecnología'], ['home', 'Hogar'], ['sports', 'Deporte']];
const labels = {general:'Vista general', operaciones:'Operaciones', datos:'Fuente de datos', reporte:'Reporte ejecutivo'};
const currency = new Intl.NumberFormat('es-MX', {style:'currency', currency:'MXN'});
const money = cents => currency.format(cents / 100);
const sumCents = rows => rows.reduce((total, row) => total + row.amount_cents, 0);
const byId = id => document.getElementById(id);
const statusLabel = status => status === 'pending' ? 'Pendiente' : 'Confirmada';
const state = {segment:'all', status:'all', query:''};

function dropdown(label, choices, selected, onChange) {
  const details = document.createElement('details');
  details.className = 'dropdown';
  const summary = document.createElement('summary');
  const caption = document.createElement('span');
  caption.className = 'filter-label';
  caption.textContent = label;
  const value = document.createElement('strong');
  summary.append(caption, value);
  const options = document.createElement('div');
  options.className = 'dropdown-options';
  const buttons = choices.map(([key, text]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.addEventListener('click', () => {
      select(key);
      details.open = false;
      summary.focus();
      onChange(key);
    });
    options.append(button);
    return [key, text, button];
  });
  function select(key) {
    for (const [id, text, button] of buttons) {
      button.setAttribute('aria-pressed', id === key);
      if (id === key) value.textContent = text;
    }
  }
  details.append(summary, options);
  details.addEventListener('keydown', event => {
    if (event.key === 'Escape' && details.open) {
      event.preventDefault();
      details.open = false;
      summary.focus();
    }
    if (['ArrowUp','ArrowDown'].includes(event.key)) {
      event.preventDefault();
      details.open = true;
      const index = buttons.findIndex(([, , button]) => button === document.activeElement);
      const next = index < 0 ? (event.key === 'ArrowUp' ? buttons.length - 1 : 0) :
        (index + (event.key === 'ArrowUp' ? -1 : 1) + buttons.length) % buttons.length;
      buttons[next][2].focus();
    }
  });
  details.addEventListener('focusout', event => {
    if (event.relatedTarget && !details.contains(event.relatedTarget)) details.open = false;
  });
  select(selected);
  return details;
}

function metric(label, value) {
  const card = document.createElement('article');
  card.className = 'metric';
  const caption = document.createElement('span');
  caption.textContent = label;
  const number = document.createElement('strong');
  number.textContent = value;
  card.append(caption, number);
  return card;
}

function bar(label, cents, total) {
  const row = document.createElement('div');
  row.className = 'bar';
  const name = document.createElement('span');
  name.textContent = label;
  const meter = document.createElement('meter');
  meter.max = total || 1;
  meter.value = cents;
  meter.setAttribute('aria-label', label);
  const amount = document.createElement('strong');
  amount.textContent = money(cents);
  row.append(name, meter, amount);
  return row;
}

function drawOperations() {
  const filtered = operations.filter(row => (state.segment === 'all' || row.segment === state.segment)
    && (state.status === 'all' || row.status === state.status));
  const query = state.query.trim().toLocaleLowerCase('es-MX');
  const visible = filtered.filter(row => [row.id,row.label,row.date,statusLabel(row.status)]
    .some(value => value.toLocaleLowerCase('es-MX').includes(query)));
  const total = sumCents(filtered);
  byId('metrics').replaceChildren(metric('Importe visible', money(total)),
    metric('Operaciones visibles', filtered.length),
    metric('Confirmadas', filtered.filter(row => row.status === 'confirmed').length),
    metric('Pendientes', filtered.filter(row => row.status === 'pending').length));
  byId('segments').replaceChildren(...segments.map(([key,label]) =>
    bar(label, sumCents(filtered.filter(row => row.segment === key)), total)));
  byId('operation-rows').replaceChildren(...visible.map(row => {
    const line = document.createElement('tr');
    for (const text of [row.id,row.date,row.label,statusLabel(row.status),money(row.amount_cents)]) {
      line.insertCell().textContent = text;
    }
    return line;
  }));
  byId('row-count').textContent = visible.length + (visible.length === 1 ? ' operación' : ' operaciones');
  byId('no-rows').hidden = visible.length > 0;
}

function showView() {
  const key = location.hash.slice(1);
  const view = Object.hasOwn(labels,key) ? key : 'general';
  const showsOperations = view === 'general' || view === 'operaciones';
  byId('page-title').textContent = labels[view];
  byId('breadcrumb').textContent = labels[view];
  byId('filters').hidden = !showsOperations;
  byId('overview').hidden = view !== 'general';
  byId('operations').hidden = !showsOperations;
  byId('data').hidden = view !== 'datos';
  byId('report').hidden = view !== 'reporte';
  for (const link of document.querySelectorAll('nav a')) {
    if (link.hash === '#' + view) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
}

byId('filters').append(
  dropdown('Segmento', [['all','Todos'], ...segments], 'all', value => { state.segment = value; drawOperations(); }),
  dropdown('Estado', [['all','Todos'], ['pending','Pendientes'], ['confirmed','Confirmadas']], 'all',
    value => { state.status = value; drawOperations(); })
);
byId('search').addEventListener('input', event => { state.query = event.target.value; drawOperations(); });
byId('theme').addEventListener('click', event => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  event.currentTarget.textContent = dark ? 'Modo claro' : 'Modo oscuro';
  event.currentTarget.setAttribute('aria-pressed', dark);
});
byId('source').textContent = JSON.stringify(ORBIT_FIXTURE,null,2);
drawOperations();
renderReport(byId('report'), operations);
showView();
addEventListener('hashchange', showView);
