import ItemCard from './ItemCard.jsx';
import Notice from './Notice.jsx';

const SKELETON_COUNT = 6;

export default function ItemGrid({ status, items, error, hasFilters, onRetry, onClearFilters }) {
  if (status === 'error') {
    return (
      <Notice actionLabel="Try again" onAction={onRetry}>
        {error?.message ?? 'Something went wrong while loading items.'}
      </Notice>
    );
  }

  if (status === 'loading' && items.length === 0) {
    return (
      <ul className="grid" role="list" aria-hidden="true">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <li key={index}>
            <div className="card card--skeleton">
              <div className="skeleton skeleton--media" />
              <div className="card__body">
                <div className="skeleton skeleton--line" />
                <div className="skeleton skeleton--line skeleton--short" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty">
        <p className="empty__title">No items match your filters</p>
        <p className="empty__text">Try a different word, or pick another category.</p>
        {hasFilters && (
          <button type="button" className="button" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <ul className="grid" role="list" aria-busy={status === 'loading'}>
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );
}
