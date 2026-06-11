const styles = {
  wrapper: 'flex flex-col items-center justify-center flex-1 gap-3 text-neutral-400 dark:text-neutral-500',
  icon:    'h-14 w-14 opacity-30',
  label:   'text-sm',
}

function EmptyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  )
}

export function EmptyThreadView() {
  return (
    <div className={styles.wrapper}>
      <EmptyIcon />
      <p className={styles.label}>Select a conversation to get started</p>
    </div>
  )
}

