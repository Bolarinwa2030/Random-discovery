export default function CategoryFilter({ categories, totalItems, selectedCategory, onSelect }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="chips" role="group" aria-label="Filter by category">
      <button
        type="button"
        className="chip"
        aria-pressed={selectedCategory === null}
        onClick={() => onSelect(null)}
      >
        All <span className="chip__count">{totalItems}</span>
      </button>
      {categories.map((category) => (
        <button
          key={category.name}
          type="button"
          className="chip"
          aria-pressed={selectedCategory === category.name}
          onClick={() => onSelect(category.name)}
        >
          {category.name} <span className="chip__count">{category.count}</span>
        </button>
      ))}
    </div>
  );
}
