/**
 * The page's sections in scroll order. Shared by the navbar, the section rail,
 * and the scroll-spy in App, so they can never drift apart.
 *
 * It lives outside any component file because exporting non-component values
 * alongside a component breaks React Fast Refresh.
 */
export const NAV_ITEMS = [
  { id: 'hero',       label: 'HOME',       number: '00' },
  { id: 'about',      label: 'ABOUT',      number: '01' },
  { id: 'experience', label: 'EXPERIENCE', number: '02' },
  { id: 'projects',   label: 'PROJECTS',   number: '03' },
  { id: 'skills',     label: 'SKILLS',     number: '04' },
  { id: 'education',  label: 'EDUCATION',  number: '05' },
  { id: 'contact',    label: 'CONTACT',    number: '06' },
]
