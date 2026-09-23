import DiscoverButton from './DiscoverButton.jsx';
import Notice from './Notice.jsx';

export default function Hero({ totalItems, categoryCount, onDiscover, discoverBusy, discoverError }) {
  return (
    <section className="hero page" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero__title">
        Little-known things, picked at random.
      </h1>
      <p className="hero__lead">
        Surprising facts from space, nature, history, science, technology and culture. Press the button
        and see what turns up.
      </p>
      <div className="hero__actions">
        <DiscoverButton onClick={onDiscover} busy={discoverBusy} />
        {totalItems > 0 && (
          <p className="hero__count">
            {totalItems} items across {categoryCount} categories
          </p>
        )}
      </div>
      {discoverError && <Notice>{discoverError}</Notice>}
    </section>
  );
}
