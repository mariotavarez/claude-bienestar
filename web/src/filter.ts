import type {Operation} from './types';

export function filterOperations(operations: Operation[], segment: string) {
  return operations.filter(operation =>
    segment === 'all' || Boolean(operation.segment)
  );
}
