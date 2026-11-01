import {useEffect, useState} from 'react';
import {selectOperations} from './selection';
import type {Operation} from './types';
import {Dashboard} from './components/Dashboard';

export function App() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [segment, setSegment] = useState('tech');
  const [operationStatus, setOperationStatus] = useState('confirmed');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('/api/operations')
      .then(response => {
        if (!response.ok) throw new Error('Data service is unavailable');
        return response.json();
      })
      .then(data => {
        setOperations(data.operations);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const visibleOperations = selectOperations(operations, {segment, status:operationStatus});

  return <Dashboard
    operations={operations}
    visibleOperations={visibleOperations}
    segment={segment}
    operationStatus={operationStatus}
    onStatusChange={setOperationStatus}
    onSegmentChange={setSegment}
    status={status}
  />;
}
