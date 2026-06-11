import { clsx } from 'clsx'
import { Avatar } from '../basics/index.js'
import { formatMsgTime } from '../../utils/dateFormatters.js'

const styles = {
  row:           'flex items-end gap-2',
  rowOwn:        'flex-row-reverse',
  rowOther:      'flex-row',
  column:        'flex flex-col max-w-[75%]',
  columnOwn:     'items-end',
  columnOther:   'items-start',
  senderName:    'text-xs text-neutral-500 dark:text-neutral-400 mb-1 ml-1',
  bubble:        'rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
  bubbleOwn:     'bg-violet-600 text-white rounded-br-sm',
  bubbleOther:   'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-bl-sm',
  timestamp:     'text-xs text-neutral-400 dark:text-neutral-500 mt-1 mx-1',
  avatarWrapper: 'shrink-0 mb-1',
}

export function MessageBubble({ message, isOwn, isOnline }) {
  const { sender } = message

  return (
    <div className={clsx(styles.row, isOwn ? styles.rowOwn : styles.rowOther)}>
      {!isOwn && (
        <Avatar user={sender} online={isOnline} size="sm" className={styles.avatarWrapper} />
      )}

      <div className={clsx(styles.column, isOwn ? styles.columnOwn : styles.columnOther)}>
        {!isOwn && (
          <span className={styles.senderName}>{sender?.username}</span>
        )}

        <div className={clsx(styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther)}>
          {message.body}
        </div>

        <span className={styles.timestamp}>{formatMsgTime(message.createdAt)}</span>
      </div>
    </div>
  )
}

