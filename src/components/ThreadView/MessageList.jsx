import { Button, Spinner } from '../basics/index.js'
import { MessageBubble } from './MessageBubble.jsx'
import { DateDivider } from './DateDivider.jsx'
import { formatMsgDate, isSameDay } from '../../utils/dateFormatters.js'

const styles = {
  scrollArea:       'flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2',
  loadMoreWrapper:  'flex justify-center py-2',
  spinnerWrapper:   'flex justify-center py-8',
  messageGroup:     '',
}

export function MessageList({ messages, loading, hasMore, currentUserId, onlineUserIds, onLoadMore, bottomRef }) {
  return (
    <div className={styles.scrollArea}>
      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <Button variant="ghost" size="sm" onClick={onLoadMore} loading={loading}>
            Load earlier messages
          </Button>
        </div>
      )}

      {loading && messages.length === 0 && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}

      {messages.map((msg, i) => {
        const prev     = messages[i - 1]
        const showDate = !prev || !isSameDay(prev.createdAt, msg.createdAt)
        const isOwn    = msg.sender?.id === currentUserId
        const isOnline = !isOwn && onlineUserIds.includes(msg.sender?.id)

        return (
          <div key={msg.id} className={styles.messageGroup}>
            {showDate && <DateDivider date={formatMsgDate(msg.createdAt)} />}
            <MessageBubble message={msg} isOwn={isOwn} isOnline={isOnline} />
          </div>
        )
      })}

      <div ref={bottomRef} />
    </div>
  )
}

