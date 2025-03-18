import api from "./api"


export const createPost = (data) => api.post("/api/posts", data)