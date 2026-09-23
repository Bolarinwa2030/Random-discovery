import { useCallback, useEffect, useState } from 'react';

// The open item lives in the URL hash (#/items/12). Links are shareable, the back button
// works, and the app can be served as static files with no server-side routing rules.
const HASH_PATTERN = /^#\/items\/(\d+)$/;

function readItemId() {
  const match = window.location.hash.match(HASH_PATTERN);
  return match ? Number(match[1]) : null;
}

export function useSelectedItem() {
  const [itemId, setItemId] = useState(readItemId);

  useEffect(() => {
    const handleHashChange = () => setItemId(readItemId());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openItem = useCallback((id) => {
    window.location.hash = `/items/${id}`;
  }, []);

  const closeItem = useCallback(() => {
    // Drop the hash without leaving a stray "#" in the address bar or adding a history entry.
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setItemId(null);
  }, []);

  return { itemId, openItem, closeItem };
}
