import { ThemeToggle } from '../ThemeToggle/index.jsx'

const styles = {
  bar:           'flex items-center gap-2 px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 sm:hidden',
  menuButton:    'p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors',
  menuIcon:      'h-5 w-5',
  title:         'text-sm font-semibold text-neutral-900 dark:text-neutral-100',
  spacer:        'flex-1',
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function MobileTopBar({ onToggleSidebar }) {
  return (
    <div className={styles.bar}>
      <button
        onClick={onToggleSidebar}
        className={styles.menuButton}
        aria-label="Toggle sidebar"
      >
        <HamburgerIcon />
      </button>
      <span className={styles.title}>Messages</span>
      <div className={styles.spacer} />
      <ThemeToggle />
    </div>
  )
}

