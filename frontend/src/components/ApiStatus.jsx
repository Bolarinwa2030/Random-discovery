import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

const LABELS = {
  checking: 'Checking service',
  online: 'Service online',
  offline: 'Service unreachable',
};

// Calls /api/health so a broken frontend-to-backend connection is obvious during deployments.
export default function ApiStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const controller = new AbortController();
    api
      .getHealth({ signal: controller.signal })
      .then((body) => setStatus(body?.status === 'ok' ? 'online' : 'offline'))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setStatus('offline');
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <p className="api-status" role="status">
      <span className={`api-status__dot api-status__dot--${status}`} aria-hidden="true" />
      {LABELS[status]}
    </p>
  );
}
