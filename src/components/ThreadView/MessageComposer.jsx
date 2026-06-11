import { clsx } from 'clsx'
import { Button } from '../basics/index.js'

const styles = {
  form:        'shrink-0 border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-end gap-2',
  textarea:    clsx(
    'flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none transition-colors',
    'bg-white dark:bg-neutral-900',
    'text-neutral-900 dark:text-neutral-100',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
    'border-neutral-300 dark:border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30',
    'max-h-36 overflow-y-auto',
  ),
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

function autoResize(e) {
  e.target.style.height = 'auto'
  e.target.style.height = Math.min(e.target.scrollHeight, 144) + 'px'
}

export function MessageComposer({ body, sending, onChange, onKeyDown, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <textarea
        value={body}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onInput={autoResize}
        placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
        rows={1}
        className={styles.textarea}
        style={{ height: 'auto' }}
      />

      <Button type="submit" size="icon" disabled={!body.trim() || sending} loading={sending}>
        <SendIcon />
      </Button>
    </form>
  )
}

