import { Avatar } from '../basics/index.js'

const styles = {
  list:       'absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden',
  item:       'flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors',
  userInfo:   'flex flex-col min-w-0',
  username:   'text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate',
  email:      'text-xs text-neutral-500 dark:text-neutral-400 truncate',
}

export function UserSuggestionList({ suggestions, onSelect }) {
  if (suggestions.length === 0) return null

  return (
    <ul className={styles.list}>
      {suggestions.map(user => (
        <li key={user.id}>
          <button type="button" onClick={() => onSelect(user)} className={styles.item}>
            <Avatar user={user} size="sm" />
            <div className={styles.userInfo}>
              <span className={styles.username}>{user.username}</span>
              <span className={styles.email}>{user.email}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}

