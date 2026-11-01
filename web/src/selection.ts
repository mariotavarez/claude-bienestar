import type {Operation} from './types';
import {filterOperations} from './filter.ts';

export type Selection = {segment: string; status: string};

// The segment filter works. The new status requirement is not implemented yet.
export function selectOperations(operations: Operation[], selection: Selection) {
  return filterOperations(operations, selection.segment);
}

export function summarizeOperations(operations: Operation[]) {
  return {
    count: operations.length,
    total_cents: operations.reduce((sum, operation) => sum + operation.amount_cents, 0),
  };
}
