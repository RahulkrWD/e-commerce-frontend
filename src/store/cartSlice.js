// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: JSON.parse(localStorage.getItem("cartItems")) || [],
// };
// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const existingItem = state.items.find(
//         (item) => item.productId === action.payload.productId
//       );
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice = existingItem.quantity * existingItem.cost;
//       } else {
//         state.items.push({
//           ...action.payload,
//           quantity: 1,
//           totalPrice: action.payload.cost,
//         });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//     increaseQuantity: (state, action) => {
//       const item = state.items.find(
//         (item) => item.productId === action.payload.productId
//       );
//       if (item) {
//         item.quantity++;
//         item.totalPrice = item.quantity * item.cost;
//         localStorage.setItem("cartItems", JSON.stringify(state.items));
//       }
//     },
//     decreaseQuantity: (state, action) => {
//       const item = state.items.find(
//         (item) => item.productId === action.payload.productId
//       );
//       if (item && item.quantity > 1) {
//         item.quantity--;
//         item.totalPrice = item.quantity * item.cost;
//         localStorage.setItem("cartItems", JSON.stringify(state.items));
//       }
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.productId !== action.payload.productId
//       );
//       localStorage.setItem("cartItems", JSON.stringify(state.items));
//     },
//   },
// });

// export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
//   cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;

// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

// Encryption and decryption key
const SECRET_KEY = process.env.REACT_APP_SECRETKEY;

// Function to encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Get items from localStorage and decrypt them
const getLocalStorageItems = () => {
  const encryptedData = localStorage.getItem("cartItems");
  if (encryptedData) {
    try {
      return decryptData(encryptedData);
    } catch (e) {
      console.error("Error decrypting cart items from localStorage", e);
      return [];
    }
  }
  return [];
};

const initialState = {
  items: getLocalStorageItems(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.cost;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.cost,
        });
      }
      localStorage.setItem("cartItems", encryptData(state.items));
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.cost;
        localStorage.setItem("cartItems", encryptData(state.items));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.cost;
        localStorage.setItem("cartItems", encryptData(state.items));
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
      localStorage.setItem("cartItems", encryptData(state.items));
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
