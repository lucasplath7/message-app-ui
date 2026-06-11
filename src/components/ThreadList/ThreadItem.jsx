import { clsx } from 'clsx'
import { Avatar } from '../basics/index.js'
import { formatThreadTime } from '../../utils/dateFormatters.js'

const styles = {
  button:          'w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-colors',
  buttonSelected:  'bg-violet-600 text-white',
  buttonDefault:   'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
  content:         'flex-1 min-w-0',
  topRow:          'flex items-center justify-between gap-2',
  subject:         'text-sm font-semibold truncate',
  subjectSelected: 'text-white',
  timestamp:       'text-xs shrink-0',
  timestampSelected: 'text-violet-200',
  timestampDefault:  'text-neutral-400 dark:text-neutral-500',
  preview:         'text-xs truncate mt-0.5',
  previewSelected: 'text-violet-200',
  previewDefault:  'text-neutral-500 dark:text-neutral-400',
  typingText:      'italic',
  typingSelected:  'text-violet-200',
  typingDefault:   'text-violet-500 dark:text-violet-400',
}

export function ThreadItem({ thread, isSelected, currentUserId, onlineUserIds, typingUserIds, onSelect }) {
  const otherParticipants = thread.participants?.filter(p => p.id !== currentUserId) ?? []
  const primaryUser       = otherParticipants[0]
  const isOnline          = primaryUser ? onlineUserIds.includes(primaryUser.id) : false
  const anyTyping         = typingUserIds && typingUserIds.filter(id => id !== currentUserId).length > 0

  return (
    <button
      onClick={() => onSelect(thread.id)}
      className={clsx(styles.button, isSelected ? styles.buttonSelected : styles.buttonDefault)}
    >
      <Avatar user={primaryUser} online={isOnline} size="md" />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={clsx(styles.subject, isSelected && styles.subjectSelected)}>
            {thread.subject}
          </span>
          <span className={clsx(styles.timestamp, isSelected ? styles.timestampSelected : styles.timestampDefault)}>
            {formatThreadTime(thread.updatedAt)}
          </span>
        </div>

        <p className={clsx(styles.preview, isSelected ? styles.previewSelected : styles.previewDefault)}>
          {anyTyping ? (
            <span className={clsx(styles.typingText, isSelected ? styles.typingSelected : styles.typingDefault)}>
              typing…
            </span>
          ) : (
            thread.lastMessage?.body || 'No messages yet'
          )}
        </p>
      </div>
    </button>
  )
}

