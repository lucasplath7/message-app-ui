import { Spinner } from '../basics/index.js'

const styles = {
  screen:  'flex items-center justify-center h-screen bg-neutral-50 dark:bg-neutral-950',
  inner:   'flex flex-col items-center gap-3 text-neutral-500 dark:text-neutral-400',
  label:   'text-sm',
}

export function AppLoadingScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <Spinner size="lg" />
        <p className={styles.label}>Setting up…</p>
      </div>
    </div>
  )
}

