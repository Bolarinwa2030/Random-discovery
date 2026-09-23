export default function SearchBox({ value, onChange }) {
  return (
    <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="visually-hidden" htmlFor="search-input">
        Search items by title
      </label>
      <svg className="search__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="search-input"
        className="search__input"
        type="search"
        name="q"
        value={value}
        maxLength={100}
        autoComplete="off"
        placeholder="Search by title"
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  );
}
