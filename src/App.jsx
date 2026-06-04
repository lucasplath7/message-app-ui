import { useState } from 'react'
import { Show, SignIn } from '@clerk/react'
import { About } from './components/About/index.jsx'
import { AppContainer } from './containers/App/AppContainer.jsx'

function App() {
  return (
    <>
      <About />

      <Show when="signed-out">
        <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Messages</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Sign in to continue</p>
            </div>
            <SignIn routing="hash" />
          </div>
        </div>
      </Show>

      <Show when="signed-in">
        <AppContainer />
      </Show>
    </>
  )
}

export default App