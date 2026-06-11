import { Button } from '../basics/index.js'

const styles = {
  wrapper: 'flex flex-col items-center justify-center h-full gap-2 text-neutral-400 dark:text-neutral-500 text-sm',
  icon:    'h-10 w-10 opacity-40',
}

function NoThreadsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )
}

export function EmptyThreadList({ onNewThread }) {
  return (
    <div className={styles.wrapper}>
      <NoThreadsIcon />
      <p>No conversations yet</p>
      <Button size="sm" onClick={onNewThread}>Start one</Button>
    </div>
  )
}

