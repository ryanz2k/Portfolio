interface StarburstProps {
  rays?: number
  color?: string
  className?: string
}

/** Radial sunburst of wedges, the backdrop behind every big P5 moment. */
const Starburst = ({ rays = 24, color = '#E60012', className = '' }: StarburstProps) => {
  const step = 360 / rays
  const wedges = Array.from({ length: rays / 2 }, (_, i) => {
    const a1 = ((i * 2 * step) * Math.PI) / 180
    const a2 = (((i * 2 + 1) * step) * Math.PI) / 180
    return `M50 50 L${50 + 80 * Math.cos(a1)} ${50 + 80 * Math.sin(a1)} L${50 + 80 * Math.cos(a2)} ${50 + 80 * Math.sin(a2)} Z`
  })

  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid slice">
      <path d={wedges.join(' ')} fill={color} />
    </svg>
  )
}

export default Starburst
