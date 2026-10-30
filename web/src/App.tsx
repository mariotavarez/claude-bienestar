import {useEffect, useState} from 'react';
import {filterOperations} from './filter';
import type {Operation} from './types';
import {Dashboard} from './components/Dashboard';

export function App() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [segment, setSegment] = useState('all');
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

  const visibleOperations = filterOperations(operations, segment);

  return <Dashboard
    operations={operations}
    visibleOperations={visibleOperations}
    segment={segment}
    onSegmentChange={setSegment}
    status={status}
  />;
}
