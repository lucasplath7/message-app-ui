import { Dialog, Button, Input, Textarea } from '../basics/index.js'
import { RecipientPicker } from './RecipientPicker.jsx'

const styles = {
  form:       'flex flex-col gap-4',
  errorBanner: 'text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2',
}

export function NewThreadForm({
  open,
  creating,
  subject,
  initialMessage,
  recipientSearch,
  selectedRecipients,
  suggestions,
  inputRef,
  error,
  onSubjectChange,
  onMessageChange,
  onSearchChange,
  onAddRecipient,
  onRemoveRecipient,
  onSubmit,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="New Conversation"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={creating}>
            Cancel
          </Button>
          <Button type="submit" form="new-thread-form" loading={creating}>
            Create
          </Button>
        </>
      }
    >
      <form id="new-thread-form" onSubmit={onSubmit} className={styles.form}>
        <Input
          label="Subject"
          placeholder="What's this about?"
          value={subject}
          onChange={e => onSubjectChange(e.target.value)}
          maxLength={500}
        />

        <RecipientPicker
          selectedRecipients={selectedRecipients}
          suggestions={suggestions}
          search={recipientSearch}
          inputRef={inputRef}
          onSearchChange={onSearchChange}
          onSelect={onAddRecipient}
          onRemove={onRemoveRecipient}
        />

        <Textarea
          label="First message"
          placeholder="Write your opening message…"
          value={initialMessage}
          onChange={e => onMessageChange(e.target.value)}
          rows={4}
        />

        {error && (
          <p className={styles.errorBanner}>{error}</p>
        )}
      </form>
    </Dialog>
  )
}

