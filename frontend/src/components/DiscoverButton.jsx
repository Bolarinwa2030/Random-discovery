export default function DiscoverButton({ onClick, busy, label = 'Discover Something' }) {
  return (
    <button
      type="button"
      className="button button--discover"
      onClick={onClick}
      disabled={busy}
      aria-busy={busy}
    >
      <svg className="dice" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="15.5" cy="15.5" r="1.6" fill="currentColor" />
      </svg>
      <span>{busy ? 'Discovering…' : label}</span>
    </button>
  );
}
