import { clsx } from 'clsx'

/**
 * User avatar — shows image if available, otherwise initials.
 * An online indicator dot is shown when `online` prop is true.
 */
export function Avatar({ user, online, size = 'md', className }) {
  const sizes = {
    sm:  { outer: 'h-7 w-7 text-xs', dot: 'h-2 w-2' },
    md:  { outer: 'h-9 w-9 text-sm', dot: 'h-2.5 w-2.5' },
    lg:  { outer: 'h-11 w-11 text-base', dot: 'h-3 w-3' },
  }

  const { outer, dot } = sizes[size] || sizes.md

  const initials = user
    ? (user.username?.[0] ?? '?').toUpperCase()
    : '?'

  return (
    <div className={clsx('relative inline-flex shrink-0', className)}>
      <div
        className={clsx(
          'rounded-full flex items-center justify-center font-medium',
          outer,
          user?.imageUrl
            ? 'bg-transparent'
            : 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
        )}
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.username ?? 'User avatar'}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {online !== undefined && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-neutral-900',
            dot,
            online ? 'bg-green-500' : 'bg-neutral-400',
          )}
        />
      )}
    </div>
  )
}

