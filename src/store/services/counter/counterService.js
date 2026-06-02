import apiClient from '../apiClient.js'
import { deserializeCounterValue } from './deserializers/getCount.js'

/**
 * Fetches the current counter value from the REST API.
 * Used on mount to hydrate the Redux store before the socket connection
 * starts delivering live updates.
 * @returns {Promise<number>}
 */
export async function getCounter() {
  const { data } = await apiClient.get('/counter')
  return deserializeCounterValue(data)
}
