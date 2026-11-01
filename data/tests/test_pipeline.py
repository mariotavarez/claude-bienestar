import copy
import json
import unittest
from pathlib import Path
from data.pipeline import clean_operations

class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.rows = json.loads(Path('fixtures/raw-operations.json').read_text(encoding='utf8'))

    def test_fixture_is_reconciled_without_silent_loss(self):
        result = clean_operations(self.rows)
        self.assertEqual({key: len(value) for key,value in result.items()}, {'clean':5,'duplicates':1,'conflicts':2,'invalid':1})
        self.assertEqual(sum(map(len, result.values())), len(self.rows))

    def test_same_id_different_amount_is_quarantined(self):
        result = clean_operations(self.rows)
        self.assertNotIn('OP003', [row['id'] for row in result['clean']])
        self.assertEqual({entry['operation']['id'] for entry in result['conflicts']}, {'OP003'})

    def test_null_amount_is_not_guessed_as_zero(self):
        row = {'id':'X','segment':'tech','status':'confirmed','amount_cents':None}
        result = clean_operations([row])
        self.assertEqual(len(result['invalid']), 1)
        self.assertEqual(result['clean'], [])

    def test_empty_input_and_input_immutability(self):
        original = copy.deepcopy(self.rows)
        self.assertEqual(clean_operations([]), {'clean':[],'duplicates':[],'conflicts':[],'invalid':[]})
        clean_operations(self.rows)
        self.assertEqual(self.rows, original)

    def test_trim_and_case_do_not_create_false_conflicts(self):
        row = {'id':' X ', 'segment':' TECH ', 'status':'Confirmed', 'amount_cents':0}
        result = clean_operations([row])
        self.assertEqual(result['clean'], [{'id':'X','segment':'tech','status':'confirmed','amount_cents':0}])

    def test_boolean_and_negative_are_not_valid_amounts(self):
        rows = [{'id':str(i),'segment':'tech','status':'confirmed','amount_cents':amount} for i,amount in enumerate([True, -1])]
        self.assertEqual(len(clean_operations(rows)['invalid']), 2)
