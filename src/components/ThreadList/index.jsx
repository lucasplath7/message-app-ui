import { Spinner } from '../basics/index.js'
import { ThreadListHeader } from './ThreadListHeader.jsx'
import { ThreadItem } from './ThreadItem.jsx'
import { EmptyThreadList } from './EmptyThreadList.jsx'

const styles = {
  root:        'flex flex-col h-full',
  loadingWrap: 'flex items-center justify-center flex-1',
  scrollArea:  'flex-1 overflow-y-auto px-2 py-2 space-y-0.5',
}

export function ThreadList({
  threads,
  loading,
  selectedId,
  currentUserId,
  onlineUserIds,
  typingByThread,
  onSelectThread,
  onNewThread,
}) {
  if (loading && threads.length === 0) {
    return (
      <div className={styles.loadingWrap}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <ThreadListHeader onNewThread={onNewThread} />

      <div className={styles.scrollArea}>
        {threads.length === 0 ? (
          <EmptyThreadList onNewThread={onNewThread} />
        ) : (
          threads.map(thread => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isSelected={thread.id === selectedId}
              currentUserId={currentUserId}
              onlineUserIds={onlineUserIds}
              typingUserIds={typingByThread[thread.id] ?? []}
              onSelect={onSelectThread}
            />
          ))
        )}
      </div>
    </div>
  )
}

