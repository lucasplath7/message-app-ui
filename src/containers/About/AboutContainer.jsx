import { Dialog } from '../../components/basics/index.js'

export function AboutContainer({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="About"
      panelClassName="about-image-dialog max-w-4xl"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Message architecture overview
        </p>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <img
            src="/assets/message_arch.png"
            alt="Message app architecture diagram"
            className="block w-full h-auto select-none"
          />
        </div>
      </div>
    </Dialog>
  )
}


