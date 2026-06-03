import { useDispatch, useSelector } from 'react-redux'
import { clsx } from 'clsx'
import { selectThread } from '../../store/actions/threadsActions.js'
import { Avatar, Button, Spinner } from '../../components/basics/index.js'

function formatTime(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: 'short' })
  } else {
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }
}

function ThreadItem({ thread, isSelected, currentUserId, onlineUserIds, typingUserIds }) {
  const dispatch = useDispatch()
  const otherParticipants = thread.participants?.filter(p => p.id !== currentUserId) ?? []
  const primaryUser = otherParticipants[0]
  const isOnline = primaryUser ? onlineUserIds.includes(primaryUser.id) : false
  const anyTyping = typingUserIds && typingUserIds.filter(id => id !== currentUserId).length > 0

  return (
    <button
      onClick={() => dispatch(selectThread(thread.id))}
      className={clsx(
        'w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-colors',
        isSelected
          ? 'bg-violet-600 text-white'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
      )}
    >
      <Avatar user={primaryUser} online={isOnline} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={clsx('text-sm font-semibold truncate', isSelected ? 'text-white' : '')}>
            {thread.subject}
          </span>
          <span className={clsx('text-xs shrink-0', isSelected ? 'text-violet-200' : 'text-neutral-400 dark:text-neutral-500')}>
            {formatTime(thread.updatedAt)}
          </span>
        </div>

        <p className={clsx('text-xs truncate mt-0.5', isSelected ? 'text-violet-200' : 'text-neutral-500 dark:text-neutral-400')}>
          {anyTyping ? (
            <span className={clsx('italic', isSelected ? 'text-violet-200' : 'text-violet-500 dark:text-violet-400')}>
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

export function ThreadListContainer({ onNewThread }) {
  const threads        = useSelector(s => s.threads.list)
  const loading        = useSelector(s => s.threads.loading)
  const selectedId     = useSelector(s => s.threads.selectedThreadId)
  const currentUser    = useSelector(s => s.auth.currentUser)
  const onlineUserIds  = useSelector(s => s.presence.onlineUserIds)
  const typingByThread = useSelector(s => s.typing.byThreadId)

  if (loading && threads.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
        <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Messages</h1>
        <Button size="icon" variant="primary" onClick={onNewThread} aria-label="New conversation">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-neutral-400 dark:text-neutral-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>No conversations yet</p>
            <Button size="sm" onClick={onNewThread}>Start one</Button>
          </div>
        ) : (
          threads.map(thread => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isSelected={thread.id === selectedId}
              currentUserId={currentUser?.id}
              onlineUserIds={onlineUserIds}
              typingUserIds={typingByThread[thread.id] ?? []}
            />
          ))
        )}
      </div>
    </div>
  )
}

