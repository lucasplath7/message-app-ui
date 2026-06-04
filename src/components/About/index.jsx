import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, Dialog } from '../basics/index.js'

export function About() {
  const [open, setOpen] = useState(false)

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      <style>{`
        @keyframes about-float {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 10px 25px rgba(109, 40, 217, 0.12); }
          50% { transform: translateY(-2px) scale(1.03); box-shadow: 0 14px 34px rgba(250, 40, 217, 0.24); }
        }

        @keyframes about-shimmer {
          0% { opacity: 0.12; transform: translateX(-6%) scale(0.98); }
          50% { opacity: 0.22; transform: translateX(0) scale(1); }
          100% { opacity: 0.12; transform: translateX(6%) scale(0.98); }
        }

        .about-trigger {
          animation: about-float 3.8s ease-in-out infinite;
          will-change: transform, box-shadow;
        }

        .about-trigger:hover {
          animation-play-state: paused;
        }

        .about-trigger::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.6));
          filter: blur(10px);
          opacity: 0.18;
          z-index: -1;
          animation: about-shimmer 4.4s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed top-4 right-4 z-[70]">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen(true)}
          className="about-trigger relative isolate rounded-full px-4 py-2 shadow-lg backdrop-blur-md border border-white/40 dark:border-white/10"
          aria-label="About this app"
        >
          About
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="About"
        panelClassName="max-w-5xl"
        panelStyle={{ width: 'min(92vw, 64rem)', maxWidth: '64rem' }}
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
    </>,
    document.body,
  )
}

