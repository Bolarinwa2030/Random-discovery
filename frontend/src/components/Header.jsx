export default function Header() {
  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <svg className="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="14" fill="#14213D" />
          <rect x="14" y="14" width="36" height="36" rx="8" fill="#FFC93C" />
          <circle cx="24" cy="24" r="3.6" fill="#14213D" />
          <circle cx="32" cy="32" r="3.6" fill="#14213D" />
          <circle cx="40" cy="40" r="3.6" fill="#14213D" />
        </svg>
        <span className="brand__name">Random Showcase</span>
      </div>
    </header>
  );
}
