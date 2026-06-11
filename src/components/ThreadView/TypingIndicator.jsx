const styles = {
  wrapper: 'flex items-center gap-2 px-4 py-1.5 text-xs text-neutral-500 dark:text-neutral-400',
  dots:    'flex gap-1',
  dot:     'h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce',
}

const dotDelays = ['[animation-delay:0ms]', '[animation-delay:150ms]', '[animation-delay:300ms]']

export function TypingIndicator({ typingUsers }) {
  if (!typingUsers || typingUsers.length === 0) return null

  const names = typingUsers.map(u => u.username).join(', ')
  const verb  = typingUsers.length === 1 ? 'is' : 'are'

  return (
    <div className={styles.wrapper}>
      <div className={styles.dots}>
        {dotDelays.map(delay => (
          <span key={delay} className={`${styles.dot} ${delay}`} />
        ))}
      </div>
      <span>{names} {verb} typing…</span>
    </div>
  )
}

