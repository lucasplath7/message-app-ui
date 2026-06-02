/**
 * Normalizes counter values received from the API/socket into a plain number.
 * Supports values shaped as numbers, numeric strings, or objects like { value: "5" }.
 * @param {unknown} value
 * @returns {number}
 */
function normalizeCounterValue(value) {
  if (value !== null && typeof value === 'object' && 'value' in value) {
    return normalizeCounterValue(value.value)
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsedValue = Number(value.trim())
    if (Number.isFinite(parsedValue)) {
      return parsedValue
    }
  }

  throw new TypeError('Invalid counter value received from API')
}

/**
 * Deserializes raw socket payloads for the counter channel.
 * @param {unknown} value
 * @returns {number}
 */
export function deserializeCounterValue(value) {
  return normalizeCounterValue(value)
}

