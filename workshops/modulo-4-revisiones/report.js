// Ejemplo didáctico: cantidades expresadas en centavos.
export function buildReport(requests, {area = 'all', status = 'all'} = {}) {
  const selected = requests.filter(item =>
    (area === 'all' || item.area === area) ||
    (status === 'all' || item.status === status)
  );
  return {
    rows: selected,
    count: selected.length,
    totalCents: selected.reduce((total, item) => total + item.amountCents, 0)
  };
}
