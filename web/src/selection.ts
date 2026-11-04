import type {Operation} from './types';
export type Selection = {segment: string; status: string};

export function selectOperations(operations: Operation[], selection: Selection) {
  return operations.filter(operation => {
    const matchesSegment = selection.segment === 'all' || operation.segment === selection.segment;
    const matchesStatus = selection.status === 'all' || operation.status === selection.status;
    return matchesSegment && matchesStatus;
  });
}

export function summarizeOperations(operations: Operation[]) {
  return {
    count: operations.length,
    total_cents: operations.reduce((sum, operation) => sum + operation.amount_cents, 0),
  };
}
