import { useState, useEffect } from 'react'

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout)

    return () => clearTimeout(timer)
  }, [timeout, onTimeout])

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTimer) => prevTimer - 10)
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={mode === 'selected' ? 'answered' : ''}
    />
  )
}
