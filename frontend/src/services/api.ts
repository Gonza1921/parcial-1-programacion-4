/// <reference types="vite/client" />

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | null | undefined>
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { params, ...fetchOptions } = options

  // Construir URL con query params
  const url = new URL(`${API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  })

  if (!response.ok) {
    let errorMessage = 'API Error'
    try {
      const error = await response.json()
      errorMessage = error.detail || error.message || errorMessage
    } catch {
      errorMessage = response.statusText || errorMessage
    }
    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return null as T
  }

  return response.json()
}
