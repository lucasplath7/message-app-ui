import { Sidebar } from './Sidebar.jsx'
import { MobileTopBar } from './MobileTopBar.jsx'

const styles = {
  root:          'flex h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden',
  mobileOverlay: 'sm:hidden fixed inset-0 z-10 bg-black/40',
  main:          'flex flex-col flex-1 min-w-0',
}

export function AppLayout({ sidebarOpen, onToggleSidebar, sidebar, children }) {
  return (
    <div className={styles.root}>
      <Sidebar open={sidebarOpen}>
        {sidebar}
      </Sidebar>

      {sidebarOpen && (
        <div className={styles.mobileOverlay} onClick={onToggleSidebar} />
      )}

      <main className={styles.main}>
        <MobileTopBar onToggleSidebar={onToggleSidebar} />
        {children}
      </main>
    </div>
  )
}

