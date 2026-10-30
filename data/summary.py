import json
from pathlib import Path

data = json.loads(Path('fixtures/operations.json').read_text())
operations = data['operations']
print('This file is the same source used by the panel.')
for segment in ['tech', 'home', 'sports']:
    rows = [operation for operation in operations if operation['segment'] == segment]
    total = sum(operation['amount_cents'] for operation in rows)
    print(f"{segment}: {len(rows)} operations, {total} cents = MXN {total / 100:.2f}")
