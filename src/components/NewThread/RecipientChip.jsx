const styles = {
  chip:          'inline-flex items-center gap-1 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 text-xs px-2.5 py-1',
  removeButton:  'hover:text-violet-600 dark:hover:text-violet-400 transition-colors',
}

export function RecipientChip({ user, onRemove }) {
  return (
    <span className={styles.chip}>
      {user.username}
      <button
        type="button"
        onClick={() => onRemove(user.id)}
        className={styles.removeButton}
        aria-label={`Remove ${user.username}`}
      >
        ×
      </button>
    </span>
  )
}

