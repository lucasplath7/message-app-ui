import { Button } from '../basics/index.js'

const styles = {
  header:  'flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0',
  heading: 'text-base font-bold text-neutral-900 dark:text-neutral-100',
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

export function ThreadListHeader({ onNewThread }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.heading}>Messages</h1>
      <Button size="icon" variant="primary" onClick={onNewThread} aria-label="New conversation">
        <PlusIcon />
      </Button>
    </div>
  )
}

