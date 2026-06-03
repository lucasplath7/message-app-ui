import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clsx } from 'clsx'
import { fetchMessages, sendMessage } from '../../store/actions/messagesActions.js'
import { Avatar, Button, Spinner } from '../../components/basics/index.js'
import { joinThread, leaveThread, emitTypingStart, emitTypingStop } from '../../store/services/socket.js'

function formatMsgTime(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatMsgDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
}

function isSameDay(a, b) {
  const da = new Date(a)
  const db = new Date(b)
  return da.getFullYear() === db.getFullYear()
    && da.getMonth() === db.getMonth()
    && da.getDate() === db.getDate()
}

function MessageBubble({ message, isOwn, isOnline }) {
  const { sender } = message
  return (
    <div className={clsx('flex items-end gap-2', isOwn ? 'flex-row-reverse' : 'flex-row')}>
      {!isOwn && (
        <Avatar user={sender} online={isOnline} size="sm" className="shrink-0 mb-1" />
      )}
      <div className={clsx('flex flex-col max-w-[75%]', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 ml-1">
            {sender?.username}
          </span>
        )}
        <div
          className={clsx(
            'rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
            isOwn
              ? 'bg-violet-600 text-white rounded-br-sm'
              : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-bl-sm',
          )}
        >
          {message.body}
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 mx-1">
          {formatMsgTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

function DateDivider({ date }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
      <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0">{date}</span>
      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
    </div>
  )
}

function TypingIndicator({ typingUsers }) {
  if (!typingUsers || typingUsers.length === 0) return null
  const names = typingUsers.map(u => u.username).join(', ')
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
      </div>
      <span>{names} {typingUsers.length === 1 ? 'is' : 'are'} typing…</span>
    </div>
  )
}

export function ThreadViewContainer() {
  const dispatch      = useDispatch()
  const selectedId    = useSelector(s => s.threads.selectedThreadId)
  const threads       = useSelector(s => s.threads.list)
  const thread        = threads.find(t => t.id === selectedId)
  const msgState      = useSelector(s => s.messages.byThreadId[selectedId])
  const currentUser   = useSelector(s => s.auth.currentUser)
  const onlineUserIds = useSelector(s => s.presence.onlineUserIds)
  const typingIds     = useSelector(s => s.typing.byThreadId[selectedId] ?? [])
  const allUsers      = useSelector(s => s.users.list)

  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef   = useRef(null)
  const isTypingRef = useRef(false)
  const typingTimer = useRef(null)

  // Derive typing users (exclude self)
  const typingUsers = allUsers.filter(
    u => typingIds.includes(u.id) && u.id !== currentUser?.id
  )

  // Join/leave socket room on thread change
  useEffect(() => {
    if (!selectedId) return
    joinThread(selectedId)
    return () => leaveThread(selectedId)
  }, [selectedId])

  // Fetch initial messages when thread selected
  useEffect(() => {
    if (!selectedId) return
    if (!msgState || msgState.list.length === 0) {
      dispatch(fetchMessages(selectedId))
    }
  }, [selectedId, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom when new messages arrive or thread changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgState?.list?.length, selectedId])

  const handleLoadMore = () => {
    if (msgState?.hasMore && !msgState?.loading) {
      dispatch(fetchMessages(selectedId, msgState.oldestCursor))
    }
  }

  const handleTyping = useCallback(() => {
    if (!isTypingRef.current) {
      isTypingRef.current = true
      emitTypingStart(selectedId)
    }
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      isTypingRef.current = false
      emitTypingStop(selectedId)
    }, 3000)
  }, [selectedId])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!body.trim() || sending) return
    const text = body.trim()
    setBody('')
    // Stop typing indicator
    clearTimeout(typingTimer.current)
    isTypingRef.current = false
    emitTypingStop(selectedId)
    setSending(true)
    try {
      await dispatch(sendMessage(selectedId, text))
    } catch {
      setBody(text) // restore on error
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(e)
    }
  }

  const handleInputChange = (e) => {
    setBody(e.target.value)
    if (e.target.value.trim()) handleTyping()
    else {
      clearTimeout(typingTimer.current)
      if (isTypingRef.current) {
        isTypingRef.current = false
        emitTypingStop(selectedId)
      }
    }
  }

  if (!selectedId) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-3 text-neutral-400 dark:text-neutral-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <p className="text-sm">Select a conversation to get started</p>
      </div>
    )
  }

  const messages = msgState?.list ?? []
  const loading  = msgState?.loading ?? false
  const hasMore  = msgState?.hasMore ?? false

  const otherParticipants = thread?.participants?.filter(p => p.id !== currentUser?.id) ?? []

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="shrink-0 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center gap-3">
        <div className="flex -space-x-2">
          {otherParticipants.slice(0, 3).map(p => (
            <Avatar
              key={p.id}
              user={p}
              online={onlineUserIds.includes(p.id)}
              size="sm"
              className="ring-2 ring-white dark:ring-neutral-950"
            />
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {thread?.subject}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {otherParticipants.map(p => p.username).join(', ')}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center py-2">
            <Button variant="ghost" size="sm" onClick={handleLoadMore} loading={loading}>
              Load earlier messages
            </Button>
          </div>
        )}
        {loading && messages.length === 0 && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}

        {messages.map((msg, i) => {
          const prev = messages[i - 1]
          const showDate = !prev || !isSameDay(prev.createdAt, msg.createdAt)
          const isOwn = msg.sender?.id === currentUser?.id
          const isOnline = onlineUserIds.includes(msg.sender?.id)
          return (
            <div key={msg.id}>
              {showDate && <DateDivider date={formatMsgDate(msg.createdAt)} />}
              <MessageBubble message={msg} isOwn={isOwn} isOnline={!isOwn && isOnline} />
            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>

      {/* Typing indicator */}
      <TypingIndicator typingUsers={typingUsers} />

      {/* Message input */}
      <form
        onSubmit={handleSend}
        className="shrink-0 border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-end gap-2"
      >
        <textarea
          value={body}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
          rows={1}
          className={clsx(
            'flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none transition-colors',
            'bg-white dark:bg-neutral-900',
            'text-neutral-900 dark:text-neutral-100',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            'border-neutral-300 dark:border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30',
            'max-h-36 overflow-y-auto',
          )}
          style={{ height: 'auto' }}
          onInput={(e) => {
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 144) + 'px'
          }}
        />
        <Button type="submit" size="icon" disabled={!body.trim() || sending} loading={sending}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </form>
    </div>
  )
}

