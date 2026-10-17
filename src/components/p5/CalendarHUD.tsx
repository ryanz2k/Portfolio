import { AnimatePresence, motion } from 'framer-motion'
import { NAV_ITEMS } from '../../data/navigation'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

/**
 * The P5 calendar widget, sitting in the navbar between the logo and the menu:
 * today's real date in tilted numerals, and a time-of-day slot that advances
 * as you move down the page. It lives in the bar rather than floating over the
 * page so it never covers content.
 */
const CalendarHUD = ({ activeSection }: { activeSection: string }) => {
  const now = new Date()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const day = DAYS[now.getDay()]
  const time = NAV_ITEMS.find((item) => item.id === activeSection)?.time ?? ''

  return (
    <div aria-hidden className="flex select-none items-center gap-2" style={{ transform: 'rotate(-4deg)' }}>
      <span className="font-display text-3xl leading-none text-white">
        {month}
        <span className="text-p5-red">/</span>
        {date}
      </span>
      <span className="cut-sm bg-p5-red px-1.5 font-heavy text-sm text-white">{day}</span>

      <div className="relative h-7 w-36 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={time}
            className="cut-sm absolute left-0 top-0.5 inline-block whitespace-nowrap bg-white px-2 font-cond text-base font-extrabold italic text-p5-ink"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {time}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CalendarHUD
