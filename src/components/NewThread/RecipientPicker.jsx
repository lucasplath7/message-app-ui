import { Input } from '../basics/index.js'
import { RecipientChip } from './RecipientChip.jsx'
import { UserSuggestionList } from './UserSuggestionList.jsx'

const styles = {
  field:       'flex flex-col gap-1',
  label:       'text-sm font-medium text-neutral-700 dark:text-neutral-300',
  labelCount:  'text-neutral-400 text-xs',
  chipsRow:    'flex flex-wrap gap-1.5 mb-1',
  inputWrap:   'relative',
}

export function RecipientPicker({
  selectedRecipients,
  suggestions,
  search,
  inputRef,
  onSearchChange,
  onSelect,
  onRemove,
}) {
  const atLimit = selectedRecipients.length >= 10

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        Recipients{' '}
        <span className={styles.labelCount}>({selectedRecipients.length}/10)</span>
      </label>

      {selectedRecipients.length > 0 && (
        <div className={styles.chipsRow}>
          {selectedRecipients.map(user => (
            <RecipientChip key={user.id} user={user} onRemove={onRemove} />
          ))}
        </div>
      )}

      <div className={styles.inputWrap}>
        <Input
          ref={inputRef}
          placeholder="Search by username or email…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          disabled={atLimit}
          autoComplete="off"
        />
        <UserSuggestionList suggestions={suggestions} onSelect={onSelect} />
      </div>
    </div>
  )
}

