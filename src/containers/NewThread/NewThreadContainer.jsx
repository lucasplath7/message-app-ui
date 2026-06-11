import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createThread } from '../../store/actions/threadsActions.js'
import { NewThreadForm } from '../../components/NewThread/NewThreadForm.jsx'

export function NewThreadContainer({ open, onClose }) {
  const dispatch    = useDispatch()
  const allUsers    = useSelector(s => s.users.list)
  const currentUser = useSelector(s => s.auth.currentUser)
  const creating    = useSelector(s => s.threads.creating)

  const [subject, setSubject]                   = useState('')
  const [initialMessage, setInitialMessage]     = useState('')
  const [recipientSearch, setRecipientSearch]   = useState('')
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [error, setError]                       = useState(null)
  const inputRef = useRef(null)

  const suggestions = recipientSearch.trim().length > 0
    ? allUsers
        .filter(u =>
          u.id !== currentUser?.id &&
          !selectedRecipients.find(r => r.id === u.id) &&
          `${u.username} ${u.email}`.toLowerCase().includes(recipientSearch.toLowerCase())
        )
        .slice(0, 5)
    : []

  const handleAddRecipient = (user) => {
    if (selectedRecipients.length >= 10) return
    setSelectedRecipients(prev => [...prev, user])
    setRecipientSearch('')
    inputRef.current?.focus()
  }

  const handleRemoveRecipient = (userId) => {
    setSelectedRecipients(prev => prev.filter(r => r.id !== userId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!subject.trim())              { setError('Subject is required.'); return }
    if (selectedRecipients.length === 0) { setError('Add at least one recipient.'); return }
    if (!initialMessage.trim())       { setError('Message is required.'); return }

    try {
      await dispatch(createThread({
        subject:        subject.trim(),
        recipientIds:   selectedRecipients.map(r => r.id),
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
    <NewThreadForm
      open={open}
      creating={creating}
      subject={subject}
      initialMessage={initialMessage}
      recipientSearch={recipientSearch}
      selectedRecipients={selectedRecipients}
      suggestions={suggestions}
      inputRef={inputRef}
      error={error}
      onSubjectChange={setSubject}
      onMessageChange={setInitialMessage}
      onSearchChange={setRecipientSearch}
      onAddRecipient={handleAddRecipient}
      onRemoveRecipient={handleRemoveRecipient}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  )
}

