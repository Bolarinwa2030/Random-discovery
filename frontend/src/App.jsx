import { useEffect, useState } from 'react';
import { api } from './api/client.js';
import CategoryFilter from './components/CategoryFilter.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import ItemGrid from './components/ItemGrid.jsx';
import SearchBox from './components/SearchBox.jsx';
import { useDebouncedValue } from './hooks/useDebouncedValue.js';
import { useSelectedItem } from './hooks/useSelectedItem.js';

const SEARCH_DELAY_MS = 250;

function describeResults({ status, count, category, query }) {
  if (status === 'loading' && count === 0) {
    return 'Loading items…';
  }
  const noun = count === 1 ? 'item' : 'items';
  const inCategory = category ? ` in ${category}` : '';
  const matching = query ? ` matching “${query}”` : '';
  return `Showing ${count} ${noun}${inCategory}${matching}`;
}

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const searchQuery = useDebouncedValue(searchText.trim(), SEARCH_DELAY_MS);

  const [list, setList] = useState({ status: 'loading', items: [], error: null });
  const [reloadCount, setReloadCount] = useState(0);
  const [discover, setDiscover] = useState({ busy: false, error: null });
  const { itemId, openItem, closeItem } = useSelectedItem();

  useEffect(() => {
    const controller = new AbortController();
    api
      .listCategories({ signal: controller.signal })
      .then(({ categories: loaded }) => setCategories(loaded))
      // Without categories the filter row is simply hidden; the item list reports its own errors.
      .catch(() => {});
    return () => controller.abort();
  }, [reloadCount]);

  useEffect(() => {
    const controller = new AbortController();
    setList((previous) => ({ ...previous, status: 'loading', error: null }));

    api
      .listItems({ category: selectedCategory ?? undefined, q: searchQuery, signal: controller.signal })
      .then(({ items }) => setList({ status: 'ready', items, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setList({ status: 'error', items: [], error });
        }
      });

    return () => controller.abort();
  }, [selectedCategory, searchQuery, reloadCount]);

  async function handleDiscover() {
    setDiscover({ busy: true, error: null });
    try {
      // Skip the item currently on screen so the button always feels like it did something.
      const item = await api.getRandomItem({ exclude: itemId ?? undefined });
      openItem(item.id);
      setDiscover({ busy: false, error: null });
    } catch (error) {
      setDiscover({ busy: false, error: error.message });
    }
  }

  function clearFilters() {
    setSelectedCategory(null);
    setSearchText('');
  }

  const totalItems = categories.reduce((sum, category) => sum + category.count, 0);
  const hasFilters = selectedCategory !== null || searchQuery !== '';

  return (
    <>
      <Header />
      <main>
        <Hero
          totalItems={totalItems}
          categoryCount={categories.length}
          onDiscover={handleDiscover}
          discoverBusy={discover.busy}
          discoverError={discover.error}
        />

        <section className="browse page" aria-labelledby="browse-title">
          <h2 id="browse-title" className="visually-hidden">
            Browse items
          </h2>
          <div className="toolbar">
            <SearchBox value={searchText} onChange={setSearchText} />
            <CategoryFilter
              categories={categories}
              totalItems={totalItems}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <p className="summary" role="status">
            {list.status !== 'error' &&
              describeResults({
                status: list.status,
                count: list.items.length,
                category: selectedCategory,
                query: searchQuery,
              })}
            {hasFilters && list.status !== 'error' && (
              <>
                {' '}
                <button type="button" className="link-button" onClick={clearFilters}>
                  Clear filters
                </button>
              </>
            )}
          </p>

          <ItemGrid
            status={list.status}
            items={list.items}
            error={list.error}
            hasFilters={hasFilters}
            onRetry={() => setReloadCount((count) => count + 1)}
            onClearFilters={clearFilters}
          />
        </section>
      </main>
      <Footer />

      <ItemDetail
        itemId={itemId}
        onClose={closeItem}
        onDiscoverAnother={handleDiscover}
        discoverBusy={discover.busy}
      />
    </>
  );
}
