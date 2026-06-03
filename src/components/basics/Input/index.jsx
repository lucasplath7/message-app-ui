import { clsx } from 'clsx'
import { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors',
          'bg-white dark:bg-neutral-900',
          'text-neutral-900 dark:text-neutral-100',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
          error
            ? 'border-red-400 focus:ring-2 focus:ring-red-400/40'
            : 'border-neutral-300 dark:border-neutral-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
})

