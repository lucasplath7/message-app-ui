import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, sendMessage } from '../../store/actions/messagesActions.js'
import { joinThread, emitTypingStart, emitTypingStop } from '../../store/services/socket.js'
import { ThreadView } from '../../components/ThreadView/index.jsx'

export function ThreadViewContainer() {
  const dispatch      = useDispatch()
  const selectedId    = useSelector(s => s.threads.selectedThreadId)
  const threads       = useSelector(s => s.threads.list)
  const thread        = threads.find(t => t.id === selectedId) ?? null
  const msgState      = useSelector(s => s.messages.byThreadId[selectedId])
  const currentUser   = useSelector(s => s.auth.currentUser)
  const onlineUserIds = useSelector(s => s.presence.onlineUserIds)
  const typingIds     = useSelector(s => s.typing.byThreadId[selectedId] ?? [])
  const allUsers      = useSelector(s => s.users.list)

  const [body, setBody]       = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef   = useRef(null)
  const isTypingRef = useRef(false)
  const typingTimer = useRef(null)

  const typingUsers = allUsers.filter(
    u => typingIds.includes(u.id) && u.id !== currentUser?.id
  )

  // Join socket room; stop typing on leave
  useEffect(() => {
    if (!selectedId) return
    joinThread(selectedId)
    return () => {
      if (isTypingRef.current) {
        clearTimeout(typingTimer.current)
        isTypingRef.current = false
        emitTypingStop(selectedId)
      }
    }
  }, [selectedId])

  // Fetch messages when thread is first selected
  useEffect(() => {
    if (!selectedId) return
    if (!msgState || msgState.list.length === 0) {
      dispatch(fetchMessages(selectedId))
    }
  }, [selectedId, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom on new messages or thread switch
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

  const handleBodyChange = (e) => {
    setBody(e.target.value)
    if (e.target.value.trim()) {
      handleTyping()
    } else {
      clearTimeout(typingTimer.current)
      if (isTypingRef.current) {
        isTypingRef.current = false
        emitTypingStop(selectedId)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(e)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!body.trim() || sending) return
    const text = body.trim()
    setBody('')
    clearTimeout(typingTimer.current)
    isTypingRef.current = false
    emitTypingStop(selectedId)
    setSending(true)
    try {
      await dispatch(sendMessage(selectedId, text))
    } catch {
      setBody(text)
    } finally {
      setSending(false)
    }
  }

  return (
    <ThreadView
      thread={thread}
      messages={msgState?.list ?? []}
      loading={msgState?.loading ?? false}
      hasMore={msgState?.hasMore ?? false}
      currentUserId={currentUser?.id}
      onlineUserIds={onlineUserIds}
      typingUsers={typingUsers}
      body={body}
      sending={sending}
      bottomRef={bottomRef}
      onLoadMore={handleLoadMore}
      onBodyChange={handleBodyChange}
      onKeyDown={handleKeyDown}
      onSubmit={handleSend}
    />
  )
}

