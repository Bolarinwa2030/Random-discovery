import ApiStatus from './ApiStatus.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p>Random Showcase. Every item is served by a small Node API.</p>
        <ApiStatus />
      </div>
    </footer>
  );
}
