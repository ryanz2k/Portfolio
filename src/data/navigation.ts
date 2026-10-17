
/**
 * The page's sections in scroll order. Shared by the navbar and its calendar,
 * the page wipe and the scroll-spy in App, so they can never drift apart.
 *
 * `time` is the P5 time-of-day slot the calendar HUD shows for each section,
 * so scrolling the page reads like a day passing.
 *
 * It lives outside any component file because exporting non-component values
 * alongside a component breaks React Fast Refresh.
 */
export const NAV_ITEMS = [
  { id: 'hero',       label: 'HOME',       number: '00', time: 'EARLY MORNING' },
  { id: 'about',      label: 'ABOUT',      number: '01', time: 'MORNING' },
  { id: 'experience', label: 'EXPERIENCE', number: '02', time: 'LUNCHTIME' },
  { id: 'projects',   label: 'PROJECTS',   number: '03', time: 'AFTERNOON' },
  { id: 'skills',     label: 'SKILLS',     number: '04', time: 'AFTER SCHOOL' },
  { id: 'education',  label: 'EDUCATION',  number: '05', time: 'EVENING' },
  { id: 'contact',    label: 'CONTACT',    number: '06', time: 'LATE NIGHT' },
]
