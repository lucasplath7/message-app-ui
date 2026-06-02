import { useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from './store/services/apiClient.js'
import NewUserContainer from './containers/NewUser/NewUserContainer.jsx'
import CounterContainer from './containers/Counter/CounterContainer.jsx'

import './App.css'

function App() {
  const [resp, setResp] = useState(null)
  const [error, setError] = useState(null)
  const [dbResp, setDbResp] = useState(null)
  const [dbError, setDbError] = useState(null)

  const createdUser = useSelector((state) => state.user.user)

  async function handleClick() {
    setError(null)
    try {
      const { data } = await apiClient.get('/health')
      setResp(data)
    } catch (err) {
      setResp(null)
      setError(err?.response ? `Request failed with status ${err.response.status}` : 'Request failed')
    }
  }

  async function handleDbHealthCheckButton() {
    setDbError(null)
    try {
      const { data } = await apiClient.get('/health/db')
      setDbResp(data)
    } catch (err) {
      setDbResp(null)
      setDbError(err?.response ? `Request failed with status ${err.response.status}` : 'Request failed')
    }
  }

  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      {resp && <p>{resp.message}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleDbHealthCheckButton}>DB Check</button>
      {dbResp && <p>{dbResp.data}</p>}
      {dbError && <p>{dbError}</p>}

      <hr />

      <CounterContainer />

      <hr />

      <NewUserContainer />

      {createdUser && (
        <p>
          Welcome, <strong>{createdUser.userName}</strong>! (ID: {createdUser.userId})
        </p>
      )}
    </>
  )
}

export default App
