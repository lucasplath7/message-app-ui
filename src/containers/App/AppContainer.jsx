import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUser, useAuth } from '@clerk/react'
import { syncUser } from '../../store/actions/authActions.js'
import { fetchUsers } from '../../store/actions/usersActions.js'
import { fetchThreads } from '../../store/actions/threadsActions.js'
import { setTokenGetter } from '../../store/services/apiClient.js'
import { initSocket, connectSocket, disconnectSocket, joinAllThreads } from '../../store/services/socket.js'
import { ThreadListContainer } from '../ThreadList/ThreadListContainer.jsx'
import { ThreadViewContainer } from '../ThreadView/ThreadViewContainer.jsx'
import { NewThreadContainer } from '../NewThread/NewThreadContainer.jsx'
import { AppLayout } from '../../components/AppLayout/index.jsx'
import { AppLoadingScreen } from '../../components/AppLayout/AppLoadingScreen.jsx'

export function AppContainer() {
  const dispatch = useDispatch()
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [showNewThread, setShowNewThread] = useState(false)
  const [bootstrapped, setBootstrapped]   = useState(false)
  const [sidebarOpen, setSidebarOpen]     = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    let cancelled = false

    async function bootstrap() {
      setTokenGetter(getToken)

      const syncedUser = await dispatch(syncUser(user))
      if (cancelled) return

      initSocket(dispatch)
      connectSocket(syncedUser.id)

      const [, threads] = await Promise.all([
        dispatch(fetchUsers()),
        dispatch(fetchThreads()),
      ])

      if (threads?.length) joinAllThreads(threads.map(t => t.id))
      if (!cancelled) setBootstrapped(true)
    }

    bootstrap().catch(console.error)
    return () => { cancelled = true }
  }, [isLoaded, user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => disconnectSocket(), [])

  if (!isLoaded || !bootstrapped) {
    return <AppLoadingScreen />
  }

  return (
    <>
      <AppLayout
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        sidebar={<ThreadListContainer onNewThread={() => setShowNewThread(true)} />}
      >
        <ThreadViewContainer />
      </AppLayout>

      <NewThreadContainer
        open={showNewThread}
        onClose={() => setShowNewThread(false)}
      />
    </>
  )
}

