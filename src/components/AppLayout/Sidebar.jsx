import { clsx } from 'clsx'
import { SidebarFooter } from './SidebarFooter.jsx'

const styles = {
  aside:       'flex flex-col shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-200 sm:relative absolute inset-y-0 left-0 z-20',
  asideOpen:   'w-72 sm:w-80',
  asideClosed: 'w-0 overflow-hidden',
  content:     'flex-1 min-h-0 overflow-hidden flex flex-col',
}

export function Sidebar({ open, children }) {
  return (
    <aside className={clsx(styles.aside, open ? styles.asideOpen : styles.asideClosed)}>
      <div className={styles.content}>
        {children}
      </div>
      <SidebarFooter />
    </aside>
  )
}

