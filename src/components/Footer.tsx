const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="py-8 text-center"
      style={{ borderTop: '1px solid rgba(255,34,68,0.2)', background: 'rgba(10,10,10,0.88)' }}
    >
      <p className="font-mono text-gray-600 text-xs tracking-widest">
        <span className="text-primary-500/60">// </span>
        JOHN RYAN GOMEZ · {currentYear} · BUILT WITH REACT & TS
      </p>
    </footer>
  )
}

export default Footer

