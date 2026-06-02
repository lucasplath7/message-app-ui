import apiClient from '../apiClient.js'
import { serializePostUser } from './serializers/postUser.js'
import { deserializePostUser } from './deserializers/postUser.js'

/**
 * Sends a POST request to create a new user.
 * Passes data through the serializer before sending and through the
 * deserializer after receiving the response.
 * @param {Object} userData - { userName: string }
 * @returns {Promise<Object>} - Deserialized user data { userId, userName }
 */
export async function createUser(userData) {
  const body = serializePostUser(userData)
  const { data } = await apiClient.post('/user', body)
  return deserializePostUser(data)
}


