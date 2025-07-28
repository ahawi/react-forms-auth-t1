import {API_BASE_URL} from '../../../shared/config/api'

const handleApiError = async (response: Response, defaultMessage: string) => {
  let errorMessage = defaultMessage
  try {
    const errorData = await response.json()
    if (errorData && errorData.message) {
      errorMessage = errorData.message
    } else {
      errorMessage = JSON.stringify(errorData)
    }
  } catch (e) {
    try {
      const text = await response.text()
      errorMessage = text || response.statusText || defaultMessage
    } catch (textError) {
      errorMessage = response.statusText || defaultMessage
    }
  }
  throw new Error(errorMessage)
}

export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  return response.json()
}

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error("Couldn't get users")
  }
  return response.json()
}

export const createUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    await handleApiError(response, 'Failed to create a user')
  }
  return response.json()
}

export const fetchUserById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error("Couldn't get the user")
  }
  return response.json()
}

export const updateUser = async (id: string, userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  })

  if (response.status === 304) {
    return {status: 304, message: 'The data has not been changed'}
  }

  if (!response.ok) {
    await handleApiError(response, "Couldn't update the user")
  }

  if (response.status === 204) {
    return {}
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  } else {
    const textResponse = await response.text()
    return textResponse ? {message: textResponse} : {}
  }
}

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    await handleApiError(response, "Couldn't delete user")
  }

  if (response.status === 204) {
    return {}
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }

  const responseText = await response.text()
  return responseText ? {message: responseText} : {}
}
