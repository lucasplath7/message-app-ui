import { UserButton } from '@clerk/react'
import { ThemeToggle } from '../ThemeToggle/index.jsx'

const styles = {
  footer:   'shrink-0 flex items-center gap-2 px-3 py-2 border-t border-neutral-200 dark:border-neutral-800',
  spacer:   'flex-1',
}

export function SidebarFooter() {
  return (
    <div className={styles.footer}>
      <UserButton afterSignOutUrl="/" />
      <div className={styles.spacer} />
      <ThemeToggle />
    </div>
  )
}

