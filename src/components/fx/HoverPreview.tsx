import { createPortal } from 'react-dom'
import { AnimatePresence, MotionValue, motion } from 'framer-motion'
import type { PreviewSize } from '../../hooks/useHoverPreview'

interface HoverPreviewProps {
  image: string
  title: string
  visible: boolean
  /** Viewport coordinates from `useHoverPreview`, already clamped. */
  left: MotionValue<number>
  top: MotionValue<number>
  size: PreviewSize
}

/**
 * The floating screenshot that follows the cursor across a project card,
 * styled as a snapshot pinned to a P5 confidant file: white border, red
 * offset slab, a tilted caption tab.
 *
 * It renders into <body> through a portal on purpose: the cards sit inside
 * parallax wrappers, and any ancestor with a transform becomes the containing
 * block for `position: fixed` children, which would drag the preview off the
 * cursor by the parallax offset.
 */
const HoverPreview = ({ image, title, visible, left, top, size }: HoverPreviewProps) =>
  createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed z-[9000]"
          style={{ left, top, width: size.width, height: size.height }}
          initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 520, damping: 26 }}
        >
          {/* Red slab behind the photo */}
          <div className="cut-b absolute inset-0 translate-x-3 translate-y-3 bg-p5-red" />

          <div className="cut-a relative h-full w-full bg-white p-2">
            <img
              src={image}
              alt={`${title} preview`}
              className="block h-full w-full bg-p5-ink object-contain"
            />
          </div>

          <div
            className="cut-d absolute -bottom-4 -left-3 bg-p5-ink px-4 py-1 font-display text-xl uppercase tracking-wide text-white"
            style={{ transform: 'rotate(-4deg)' }}
          >
            {title}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )

export default HoverPreview
