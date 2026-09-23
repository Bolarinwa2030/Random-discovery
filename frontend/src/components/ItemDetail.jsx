import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client.js';
import DiscoverButton from './DiscoverButton.jsx';
import ItemVisual from './ItemVisual.jsx';

// A native <dialog>: the browser handles the focus trap, Escape key and inert background.
export default function ItemDetail({ itemId, onClose, onDiscoverAnother, discoverBusy }) {
  const dialogRef = useRef(null);
  const [state, setState] = useState({ status: 'idle', item: null, error: null });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (itemId !== null && !dialog.open) {
      dialog.showModal();
    } else if (itemId === null && dialog.open) {
      dialog.close();
    }
  }, [itemId]);

  useEffect(() => {
    if (itemId === null) {
      return undefined;
    }

    const controller = new AbortController();

    api
      .getItem(itemId, { signal: controller.signal })
      .then((item) => setState({ status: 'ready', item, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ status: 'error', item: null, error });
        }
      });

    return () => controller.abort();
  }, [itemId]);

  const { item, error } = state;

  const status =
    itemId === null
      ? 'idle'
      : state.status === 'idle'
        ? 'loading'
        : state.status;

  // Clicks on the backdrop land on the <dialog> element itself, not on its content.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  // Fires for Escape as well as programmatic close; only report it while an item is open.
  const handleDialogClose = () => {
    if (itemId !== null) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="detail"
      aria-labelledby={item ? 'item-detail-title' : undefined}
      aria-label={item ? undefined : 'Item details'}
      onClick={handleBackdropClick}
      onClose={handleDialogClose}
    >
      <div className="detail__inner" style={item ? { '--hue': item.hue } : undefined}>
        <button type="button" className="detail__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {status === 'ready' && item && (
          <>
            <ItemVisual item={item} className="detail__visual" />
            <div className="detail__content">
              <span className="tag">{item.category}</span>
              <h2 id="item-detail-title" className="detail__title">
                {item.title}
              </h2>
              <p className="detail__description">{item.description}</p>
              <div className="fact">
                <h3 className="fact__title">Interesting fact</h3>
                <p className="fact__text">{item.fact}</p>
              </div>
              <div className="detail__actions">
                <DiscoverButton onClick={onDiscoverAnother} busy={discoverBusy} label="Discover another" />
              </div>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="detail__message" role="status">
            Loading…
          </div>
        )}

        {status === 'error' && (
          <div className="detail__message" role="alert">
            <p className="detail__title">
              {error?.status === 404 ? 'That item does not exist' : 'Could not load this item'}
            </p>
            <p>{error?.message}</p>
            <button type="button" className="button" onClick={onClose}>
              Back to all items
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}