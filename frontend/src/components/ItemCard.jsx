import ItemVisual from './ItemVisual.jsx';

// The whole card is a link to the item's hash URL, so it works with the keyboard,
// can be opened in a new tab and needs no click handler.
export default function ItemCard({ item }) {
  return (
    <a className="card" href={`#/items/${item.id}`}>
      <div className="card__media">
        <ItemVisual item={item} />
        <span className="tag">{item.category}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        <p className="card__text">{item.description}</p>
      </div>
    </a>
  );
}
