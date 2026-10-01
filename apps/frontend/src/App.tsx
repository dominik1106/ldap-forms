import { useEffect, useState } from 'react';
import type { HealthResponse } from '@ldap-forms/shared';

type BackendStatus =
  | { state: 'checking' }
  | { state: 'ok'; health: HealthResponse }
  | { state: 'unreachable' };

function App() {
  const [status, setStatus] = useState<BackendStatus>({ state: 'checking' });

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/health', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthResponse>;
      })
      .then((health) => setStatus({ state: 'ok', health }))
      .catch(() => {
        if (!controller.signal.aborted) setStatus({ state: 'unreachable' });
      });

    return () => controller.abort();
  }, []);

  return (
    <main>
      <h1>LDAP Forms</h1>
      <p>Backend: {statusLabel(status)}</p>
    </main>
  );
}

function statusLabel(status: BackendStatus): string {
  if (status.state === 'ok') return `ok (${status.health.timestamp})`;
  return status.state === 'checking' ? 'checking…' : 'unreachable';
}

export default App;
