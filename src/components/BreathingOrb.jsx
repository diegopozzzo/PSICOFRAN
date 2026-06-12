import { useCallback, useEffect, useRef, useState } from 'react'

const PHASES = [
  { word: 'Inhala…', phase: 'Inspira profundo', dur: 4, scale: 1.14 },
  { word: 'Sostén…', phase: 'Mantén el aire', dur: 2, scale: 1.14 },
  { word: 'Exhala…', phase: 'Suelta despacio', dur: 6, scale: 1 },
  { word: 'Pausa…', phase: 'Descansa', dur: 2, scale: 1 },
]

export default function BreathingOrb() {
  const [active, setActive] = useState(false)
  const [word, setWord] = useState('Respira')
  const [phase, setPhase] = useState('')
  const [count, setCount] = useState(null)
  const [scale, setScale] = useState(1)
  const [pulse, setPulse] = useState(true)

  const phaseIdx = useRef(0)
  const phaseTimer = useRef(null)
  const countTimer = useRef(null)

  const stop = useCallback(() => {
    setActive(false)
    setPulse(true)
    setWord('Respira')
    setPhase('')
    setCount(null)
    setScale(1)
    phaseIdx.current = 0
    clearTimeout(phaseTimer.current)
    clearInterval(countTimer.current)
  }, [])

  const runPhase = useCallback(() => {
    const p = PHASES[phaseIdx.current % PHASES.length]
    setWord(p.word)
    setPhase(p.phase)
    setScale(p.scale)
    setCount(p.dur)

    clearInterval(countTimer.current)
    let t = p.dur
    countTimer.current = setInterval(() => {
      t -= 1
      setCount(t > 0 ? t : null)
      if (t <= 0) clearInterval(countTimer.current)
    }, 1000)

    phaseIdx.current += 1
    phaseTimer.current = setTimeout(runPhase, p.dur * 1000)
  }, [])

  const toggle = () => {
    if (active) {
      stop()
    } else {
      setActive(true)
      setPulse(false)
      phaseIdx.current = 0
      runPhase()
    }
  }

  useEffect(() => () => {
    clearTimeout(phaseTimer.current)
    clearInterval(countTimer.current)
  }, [])

  return (
    <div className="relative mx-auto flex h-[min(340px,72vw)] w-[min(340px,72vw)] items-center justify-center sm:h-[380px] sm:w-[380px]">
      {/* Anillos concéntricos */}
      {[100, 78, 58].map((size, i) => (
        <span
          key={size}
          className={`orb-ring absolute rounded-full border border-blush-400/20 ${pulse ? 'orb-ring-pulse' : ''}`}
          style={{
            width: `${size}%`,
            height: `${size}%`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      {/* Núcleo interactivo */}
      <button
        type="button"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        aria-label={active ? 'Detener ejercicio de respiración' : 'Iniciar ejercicio de respiración'}
        className={`orb-core relative z-10 flex h-[min(170px,42vw)] w-[min(170px,42vw)] flex-col items-center justify-center rounded-full bg-gradient-to-br from-blush-300 via-blush-500 to-espresso-900 shadow-[0_22px_60px_rgba(54,34,39,0.28),0_0_0_18px_rgba(204,90,138,0.08)] transition-transform duration-[4000ms] ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:h-[210px] sm:w-[210px] ${pulse && !active ? 'orb-idle' : ''}`}
        style={{ transform: `scale(${scale})` }}
      >
        <span className="font-serif text-[1.65rem] font-light italic text-white/95 sm:text-[2.1rem]">
          {word}
        </span>
        {!active && (
          <span className="mt-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
            Toca para comenzar
          </span>
        )}
        {active && phase && (
          <span className="mt-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-white/70">
            {phase}
          </span>
        )}
        {count != null && active && (
          <span className="mt-1 font-serif text-2xl font-light text-white/90">{count}</span>
        )}
      </button>
    </div>
  )
}
