/**
 * Counter — pure presentational component.
 * All state and socket logic lives in CounterContainer.
 */
function Counter({ count, onIncrement, onDecrement, error }) {
  return (
    <div>
      <h2>Live Counter</h2>
      <div>
        <button onClick={onDecrement}>−</button>
        <span style={{ margin: '0 1rem', fontSize: '1.5rem' }}>
          {count ?? '…'}
        </span>
        <button onClick={onIncrement}>+</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Counter
