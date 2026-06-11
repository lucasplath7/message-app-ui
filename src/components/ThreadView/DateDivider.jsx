const styles = {
  wrapper: 'flex items-center gap-3 my-4',
  rule:    'flex-1 h-px bg-neutral-200 dark:bg-neutral-800',
  label:   'text-xs text-neutral-400 dark:text-neutral-500 shrink-0',
}

export function DateDivider({ date }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.rule} />
      <span className={styles.label}>{date}</span>
      <div className={styles.rule} />
    </div>
  )
}

