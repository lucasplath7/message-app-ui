import { Avatar } from '../basics/index.js'

const styles = {
  header:           'shrink-0 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center gap-3',
  avatarStack:      'flex -space-x-2',
  avatarRing:       'ring-2 ring-white dark:ring-neutral-950',
  meta:             'flex-1 min-w-0',
  subject:          'text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate',
  participantNames: 'text-xs text-neutral-500 dark:text-neutral-400 truncate',
}

export function ThreadHeader({ thread, otherParticipants, onlineUserIds }) {
  return (
    <div className={styles.header}>
      <div className={styles.avatarStack}>
        {otherParticipants.slice(0, 3).map(p => (
          <Avatar
            key={p.id}
            user={p}
            online={onlineUserIds.includes(p.id)}
            size="sm"
            className={styles.avatarRing}
          />
        ))}
      </div>

      <div className={styles.meta}>
        <h2 className={styles.subject}>{thread?.subject}</h2>
        <p className={styles.participantNames}>
          {otherParticipants.map(p => p.username).join(', ')}
        </p>
      </div>
    </div>
  )
}

