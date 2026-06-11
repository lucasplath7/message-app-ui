import { ThreadHeader } from './ThreadHeader.jsx'
import { MessageList } from './MessageList.jsx'
import { TypingIndicator } from './TypingIndicator.jsx'
import { MessageComposer } from './MessageComposer.jsx'
import { EmptyThreadView } from './EmptyThreadView.jsx'

const styles = {
  root: 'flex flex-col h-full',
}

export function ThreadView({
  thread,
  messages,
  loading,
  hasMore,
  currentUserId,
  onlineUserIds,
  typingUsers,
  body,
  sending,
  bottomRef,
  onLoadMore,
  onBodyChange,
  onKeyDown,
  onSubmit,
}) {
  if (!thread) return <EmptyThreadView />

  const otherParticipants = thread.participants?.filter(p => p.id !== currentUserId) ?? []

  return (
    <div className={styles.root}>
      <ThreadHeader
        thread={thread}
        otherParticipants={otherParticipants}
        onlineUserIds={onlineUserIds}
      />

      <MessageList
        messages={messages}
        loading={loading}
        hasMore={hasMore}
        currentUserId={currentUserId}
        onlineUserIds={onlineUserIds}
        onLoadMore={onLoadMore}
        bottomRef={bottomRef}
      />

      <TypingIndicator typingUsers={typingUsers} />

      <MessageComposer
        body={body}
        sending={sending}
        onChange={onBodyChange}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
      />
    </div>
  )
}

