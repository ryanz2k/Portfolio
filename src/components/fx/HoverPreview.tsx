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
 * The floating screenshot that follows the cursor across a project card.
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
        className="pointer-events-none fixed z-[9000] overflow-hidden"
        style={{
          left,
          top,
          width: size.width,
          height: size.height,
          border: '2px solid rgba(255,34,68,0.8)',
          boxShadow: '0 0 40px rgba(255,34,68,0.4), 0 16px 48px rgba(0,0,0,0.8)',
          backgroundColor: '#000',
        }}
        initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <img
          src={image}
          alt={`${title} preview`}
          className="block h-full w-full object-contain"
        />

        {/* CRT texture over the screenshot */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,34,68,0.05) 3px, rgba(255,34,68,0.05) 4px)',
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-12"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(255,34,68,0.14), transparent)',
          }}
          animate={{ y: ['-100%', `${size.height}px`] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />

        <div
          className="absolute inset-x-0 bottom-0 px-3 py-2"
          style={{
            background: 'rgba(0,0,0,0.75)',
            borderTop: '1px solid rgba(255,34,68,0.4)',
          }}
        >
          <p className="font-pixel text-white" style={{ fontSize: '8px', letterSpacing: '0.1em' }}>
            {title}
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>,
    document.body,
  )

export default HoverPreview
