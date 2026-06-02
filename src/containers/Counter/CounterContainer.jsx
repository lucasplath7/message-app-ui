import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index.js'
import Counter from '../../components/Counter/Counter.jsx'

/**
 * CounterContainer — manages the socket lifecycle and Redux bindings.
 *
 * On mount:
 *   1. Fetches the current count via REST so the value is immediately visible.
 *   2. Subscribes to the 'counter:value' socket event so every broadcast
 *      from the server (caused by any connected client) updates local state.
 *
 * On unmount:
 *   - Removes the socket listener (the singleton connection itself stays open).
 */
function CounterContainer() {
  const dispatch = useDispatch()
  const { count, error } = useSelector((state) => state.counter)
  const unsubscribeRef = useRef(null)

  useEffect(() => {
    unsubscribeRef.current = dispatch(actions.subscribeToCounter())

    return () => {
      unsubscribeRef.current?.()
    }
  }, [dispatch])

  return (
    <Counter
      count={count}
      onIncrement={() => dispatch(actions.incrementCounter())}
      onDecrement={() => dispatch(actions.decrementCounter())}
      error={error}
    />
  )
}

export default CounterContainer
