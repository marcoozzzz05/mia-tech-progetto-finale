import api from "./api"

export const createUser = (userData) => api.post("/api/users", userData)
export const login = (userRole, credentials) => api.post(`/auth/token?role=${userRole}`, credentials)