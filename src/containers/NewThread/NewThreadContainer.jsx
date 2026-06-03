import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createThread } from '../../store/actions/threadsActions.js'
import { Dialog, Button, Input, Textarea, Avatar } from '../../components/basics/index.js'

export function NewThreadContainer({ open, onClose }) {
  const dispatch = useDispatch()
  const allUsers = useSelector(s => s.users.list)
  const currentUser = useSelector(s => s.auth.currentUser)
  const creating = useSelector(s => s.threads.creating)

  const [subject, setSubject] = useState('')
  const [initialMessage, setInitialMessage] = useState('')
  const [recipientSearch, setRecipientSearch] = useState('')
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  // Suggest up to 5 closest matches, excluding self and already-selected
  const suggestions = recipientSearch.trim().length > 0
    ? allUsers
        .filter(u =>
          u.id !== currentUser?.id &&
          !selectedRecipients.find(r => r.id === u.id) &&
          `${u.username} ${u.email}`
            .toLowerCase()
            .includes(recipientSearch.toLowerCase())
        )
        .slice(0, 5)
    : []

  const addRecipient = (user) => {
    if (selectedRecipients.length >= 10) return
    setSelectedRecipients(prev => [...prev, user])
    setRecipientSearch('')
    inputRef.current?.focus()
  }

  const removeRecipient = (userId) => {
    setSelectedRecipients(prev => prev.filter(r => r.id !== userId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!subject.trim()) { setError('Subject is required.'); return }
    if (selectedRecipients.length === 0) { setError('Add at least one recipient.'); return }
    if (!initialMessage.trim()) { setError('Message is required.'); return }

    try {
      await dispatch(createThread({
        subject: subject.trim(),
        recipientIds: selectedRecipients.map(r => r.id),
        initialMessage: initialMessage.trim(),
      }))
      handleClose()
    } catch (err) {
      setError(err.message || 'Failed to create thread.')
    }
  }

  const handleClose = () => {
    setSubject('')
    setInitialMessage('')
    setRecipientSearch('')
    setSelectedRecipients([])
    setError(null)
    onClose?.()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="New Conversation"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={creating}>
            Cancel
          </Button>
          <Button type="submit" form="new-thread-form" loading={creating}>
            Create
          </Button>
        </>
      }
    >
      <form id="new-thread-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Subject"
          placeholder="What's this about?"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          maxLength={500}
        />

        {/* Recipient picker */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Recipients <span className="text-neutral-400 text-xs">({selectedRecipients.length}/10)</span>
          </label>

          {/* Selected chips */}
          {selectedRecipients.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-1">
              {selectedRecipients.map(r => (
                <span
                  key={r.id}
                  className="inline-flex items-center gap-1 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 text-xs px-2.5 py-1"
                >
                  {r.username}
                  <button
                    type="button"
                    onClick={() => removeRecipient(r.id)}
                    className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    aria-label={`Remove ${r.username}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search input */}
          <div className="relative">
            <Input
              ref={inputRef}
              placeholder="Search by username or email…"
              value={recipientSearch}
              onChange={e => setRecipientSearch(e.target.value)}
              disabled={selectedRecipients.length >= 10}
              autoComplete="off"
            />

            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden">
                {suggestions.map(u => (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => addRecipient(u)}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
                    >
                      <Avatar user={u} size="sm" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {u.username}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{u.email}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Textarea
          label="First message"
          placeholder="Write your opening message…"
          value={initialMessage}
          onChange={e => setInitialMessage(e.target.value)}
          rows={4}
        />

        {error && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </form>
    </Dialog>
  )
}

