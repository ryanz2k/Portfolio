/**
 * Section navigation goes through one event so every link on the page gets the
 * same P5 screen wipe. `PageWipe` listens for it, covers the screen, jumps to
 * the section and uncovers it again.
 */
export const WIPE_EVENT = 'p5-wipe'

export const navigateTo = (id: string) => {
  window.dispatchEvent(new CustomEvent<string>(WIPE_EVENT, { detail: id }))
}
