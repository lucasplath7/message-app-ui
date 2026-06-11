import { useDispatch, useSelector } from 'react-redux'
import { selectThread } from '../../store/actions/threadsActions.js'
import { ThreadList } from '../../components/ThreadList/index.jsx'

export function ThreadListContainer({ onNewThread }) {
  const dispatch       = useDispatch()
  const threads        = useSelector(s => s.threads.list)
  const loading        = useSelector(s => s.threads.loading)
  const selectedId     = useSelector(s => s.threads.selectedThreadId)
  const currentUser    = useSelector(s => s.auth.currentUser)
  const onlineUserIds  = useSelector(s => s.presence.onlineUserIds)
  const typingByThread = useSelector(s => s.typing.byThreadId)

  const handleSelectThread = (threadId) => dispatch(selectThread(threadId))

  return (
    <ThreadList
      threads={threads}
      loading={loading}
      selectedId={selectedId}
      currentUserId={currentUser?.id}
      onlineUserIds={onlineUserIds}
      typingByThread={typingByThread}
      onSelectThread={handleSelectThread}
      onNewThread={onNewThread}
    />
  )
}

