const BASE_URL = "http://localhost:5001/api/specs"

export const generateSpec = async (data) => {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || `Server error: ${res.status}`)
  }

  return res.json()
}

export const getHistory = async () => {
  const res = await fetch(`${BASE_URL}/history`)
  return res.json()
}
