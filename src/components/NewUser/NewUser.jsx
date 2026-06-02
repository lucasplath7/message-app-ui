import { useState } from 'react'

const MIN_LENGTH = 4

function NewUser({ onSubmit, loading, error }) {
  const [showForm, setShowForm] = useState(false)
  const [userName, setUserName] = useState('')

  const trimmedUserName = userName.trim()
  const hasWhitespace = /\s/.test(trimmedUserName)
  const isValid = trimmedUserName.length >= MIN_LENGTH && !hasWhitespace

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    onSubmit({ userName: trimmedUserName })
  }

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)}>
        Create User
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user name"
        disabled={loading}
        autoFocus
      />
      <button type="submit" disabled={!isValid || loading}>
        {loading ? 'Submitting…' : 'Submit'}
      </button>
      {trimmedUserName.length > 0 && trimmedUserName.length < MIN_LENGTH && (
        <p>Name must be at least {MIN_LENGTH} characters.</p>
      )}
      {hasWhitespace && <p>Name cannot contain whitespace.</p>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default NewUser

