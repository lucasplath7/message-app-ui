import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUser, useAuth, UserButton } from '@clerk/react'
import { syncUser } from '../../store/actions/authActions.js'
import { fetchUsers } from '../../store/actions/usersActions.js'
import { fetchThreads } from '../../store/actions/threadsActions.js'
import { setTokenGetter } from '../../store/services/apiClient.js'
import { initSocket, connectSocket, disconnectSocket, joinAllThreads } from '../../store/services/socket.js'
import { ThreadListContainer } from '../ThreadList/ThreadListContainer.jsx'
import { ThreadViewContainer } from '../ThreadView/ThreadViewContainer.jsx'
import { NewThreadContainer } from '../NewThread/NewThreadContainer.jsx'
import { ThemeToggle } from '../../components/ThemeToggle/index.jsx'
import { Spinner } from '../../components/basics/index.js'

export function AppContainer() {
  const dispatch = useDispatch()
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [showNewThread, setShowNewThread] = useState(false)
  const [bootstrapped, setBootstrapped] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    let cancelled = false

    async function bootstrap() {
      // 1. Wire up Clerk token to all API requests
      setTokenGetter(getToken)

      // 2. Sync user into backend DB
      const syncedUser = await dispatch(syncUser(user))
      if (cancelled) return

      // 3. Init socket and connect
      initSocket(dispatch)
      connectSocket(syncedUser.id)

      // 4. Fetch all users and threads in parallel
      const [, threads] = await Promise.all([
        dispatch(fetchUsers()),
        dispatch(fetchThreads()),
      ])

      // 5. Join all thread socket rooms so sidebar typing indicators work
      //    for every thread, not just the currently selected one.
      if (threads?.length) {
        joinAllThreads(threads.map(t => t.id))
      }

      if (!cancelled) setBootstrapped(true)
    }

    bootstrap().catch(console.error)

    return () => {
      cancelled = true
    }
  }, [isLoaded, user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Disconnect socket on unmount / sign-out
  useEffect(() => {
    return () => disconnectSocket()
  }, [])

  if (!isLoaded || !bootstrapped) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-3 text-neutral-500 dark:text-neutral-400">
          <Spinner size="lg" />
          <p className="text-sm">Setting up…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col shrink-0 border-r border-neutral-200 dark:border-neutral-800
          bg-white dark:bg-neutral-950
          transition-all duration-200
          ${sidebarOpen ? 'w-72 sm:w-80' : 'w-0 overflow-hidden'}
          sm:relative absolute inset-y-0 left-0 z-20
        `}
      >
        <ThreadListContainer onNewThread={() => setShowNewThread(true)} />

        {/* Sidebar footer — user + theme */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-t border-neutral-200 dark:border-neutral-800">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1" />
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sm:hidden fixed inset-0 z-10 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex flex-col flex-1 min-w-0">
        {/* Top bar (mobile) */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 sm:hidden">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Messages</span>
          <div className="flex-1" />
          <ThemeToggle />
        </div>

        <ThreadViewContainer />
      </main>

      {/* New Thread dialog */}
      <NewThreadContainer
        open={showNewThread}
        onClose={() => setShowNewThread(false)}
      />
    </div>
  )
}

