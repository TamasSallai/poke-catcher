const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export type User = any

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  displayName: string
  firstName?: string
  lastName?: string
  email: string
  password: string
}

export const login = async (loginData: LoginData): Promise<User | null> => {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(loginData),
  })

  if (!response.ok) {
    throw new Error('Response was not OK')
  }

  const data = await response.json()
  return data.user
}

export const register = async (
  registerData: RegisterData
): Promise<User | null> => {
  const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(registerData),
  })

  if (!response.ok) {
    throw new Error('Response was not OK')
  }

  const data = await response.json()
  return data.user
}

export const me = async (): Promise<User> => {
  const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Response was not OK')
  }

  const data = await response.json()
  return data.user
}

export const logout = async (): Promise<void> => {
  const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Response was not OK')
  }

  await response.json()
}
