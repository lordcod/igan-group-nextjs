// api.js
import axios from "axios";

const API = "http://127.0.0.1:8000";
const isClient = typeof window !== "undefined";

export const apiClient = axios.create({
  baseURL: API,
});

// Интерсептор для добавления токена
apiClient.interceptors.request.use(
  (config) => {
    if (isClient) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getOrCreateUserId = async () => {
  if (!isClient) return null;

  let userId = localStorage.getItem("userId");
  if (!userId) {
    const res = await apiClient.post("/user/create");
    userId = res.data.id;
    localStorage.setItem("userId", userId);
  }
  return userId;
};

// === API функции ===
export const fetchDataOptions = () =>
  apiClient.get("/").then((res) => res.data);

export const loginAdmin = (data) =>
  apiClient.post("/login", data).then((res) => res.data);

export const createHandle = (type, data) =>
  apiClient.post(`/handle/${type}`, data).then((res) => res.data);

export const updateHandle = (type, id, data) =>
  apiClient.put(`/handle/${type}/${id}`, data).then((res) => res.data);

export const deleteHandle = (type, id) =>
  apiClient.delete(`/handle/${type}`, { data: { id } }).then((res) => res.data);

export const fetchPriceCalc = () =>
  apiClient.get("/price-calc").then((res) => res.data);

// === Cart / Order ===
export const fetchCartItems = async () => {
  const userId = await getOrCreateUserId();
  return apiClient.get(`/cart/${userId}`).then((res) => res.data);
};

export const clearCartItems = async () => {
  const userId = await getOrCreateUserId();
  return apiClient.delete(`/cart/${userId}`).then((res) => res.data);
};

export const postCartItems = async (data) => {
  const userId = await getOrCreateUserId();
  return apiClient.post(`/cart/${userId}`, data).then((res) => res.data);
};

export const addCartItem = async (cartItem) => {
  const userId = await getOrCreateUserId();
  return apiClient
    .post(`/cart/${userId}/product`, cartItem)
    .then((res) => res.data);
};

export const deleteCartItem = async (id) => {
  const userId = await getOrCreateUserId();
  return apiClient
    .delete(`/cart/${userId}/product/${id}`)
    .then((res) => res.data);
};

export const editCartItem = async (id, quantity) => {
  const userId = await getOrCreateUserId();
  return apiClient
    .patch(`/cart/${userId}/product/${id}`, { quantity })
    .then((res) => res.data);
};

export const getOrder = (id) =>
  apiClient.get(`/order/${id}`).then((res) => res.data);

export const getOrders = () => apiClient.get("/order/").then((res) => res.data);
