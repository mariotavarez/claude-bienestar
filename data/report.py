import json
import sqlite3
from pathlib import Path
from pipeline import clean_operations

rows = json.loads(Path('fixtures/raw-operations.json').read_text(encoding='utf8'))
result = clean_operations(rows)
with sqlite3.connect(':memory:') as connection:
    connection.execute('CREATE TABLE operations (id TEXT, segment TEXT, status TEXT, amount_cents INTEGER)')
    connection.executemany('INSERT INTO operations VALUES (:id, :segment, :status, :amount_cents)', result['clean'])
    count, total = connection.execute(
        'SELECT COUNT(*), COALESCE(SUM(amount_cents), 0) FROM operations WHERE segment = ? AND status = ?',
        ('tech', 'confirmed'),
    ).fetchone()
print(json.dumps({'input_rows':len(rows), **{key:len(value) for key,value in result.items()}, 'technology_confirmed':{'count':count,'total_cents':total}}, indent=2))
