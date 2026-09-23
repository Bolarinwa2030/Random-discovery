export default function Notice({ children, actionLabel, onAction }) {
  return (
    <div className="notice" role="alert">
      <p className="notice__text">{children}</p>
      {actionLabel && (
        <button type="button" className="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
