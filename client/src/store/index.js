import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  isPopupOpen: false,
  selectedProduct: {},
  data: [],
  isLogin: localStorage.getItem('isLogin') || false,
  userName: localStorage.getItem('userName') || "",
};
const LoginReducer = (state = initialState, action) =>
{
  switch (action.type)
  {
    case "SHOW_POPUP":
      return { ...state, isPopupOpen: true, selectedProduct: action.payload };
    case "HIDE_POPUP":
      return { ...state, isPopupOpen: false };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "ON_LOGIN":
      return { ...state, isLogin: true, userName: action.payload };
    case "ON_LOGOUT":
      return { ...state, isLogin: false, userName: "" };
    default:
      return state;
  }
};
const innitialCart = JSON.parse(localStorage.getItem("cartState")) || {
  listCart: [],
  cartTotal: 0,
};
const cartReducer = (state = innitialCart, action) =>
{
  switch (action.type)
  {
    case "ADD_CART":
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingProductIndex = state.listCart.findIndex(
        (product) =>
          product.product["_id"].$oid === action.payload.product["_id"].$oid
      );

      if (existingProductIndex !== -1)
      {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng và total
        const updatedListCart = state.listCart.map((product, index) =>
          index === existingProductIndex
            ? {
              ...product,
              quantity:
                Number(action.payload.quantity) + Number(product.quantity),
              total:
                Number(product.product.price) *
                (Number(action.payload.quantity) + Number(product.quantity)),
            }
            : product
        );
        // Tính toán lại cartTotal khi thêm số lượng
        const addedQuantity = Number(action.payload.quantity);
        const addedProductTotal =
          Number(action.payload.product.price) * addedQuantity;
        const newCartTotal = state.cartTotal + addedProductTotal;
        localStorage.setItem(
          "cartState",
          JSON.stringify({
            listCart: updatedListCart,
            cartTotal: newCartTotal,
          })
        );
        return { ...state, listCart: updatedListCart, cartTotal: newCartTotal };
      } else
      {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng và tính toán total
        const newProduct = {
          ...action.payload,
          quantity: Number(action.payload.quantity),
          total:
            Number(action.payload.product.price) *
            Number(action.payload.quantity),
        };

        // Tính toán lại cartTotal khi thêm sản phẩm mới
        const addedProductTotal =
          Number(action.payload.product.price) *
          Number(action.payload.quantity);
        const newCartTotal = state.cartTotal + addedProductTotal;
        localStorage.setItem(
          "cartState",
          JSON.stringify({
            listCart: [...state.listCart, newProduct],
            cartTotal: newCartTotal,
          })
        );
        return {
          listCart: [...state.listCart, newProduct],
          cartTotal: newCartTotal,
        };
      }

    case "UPDATE_CART":
      // Xác định vị trí của sản phẩm cần cập nhật
      const productIndexToUpdate = state.listCart.findIndex(
        (product) =>
          product.product["_id"].$oid ===
          action.payload.product.product["_id"].$oid
      );
      // Lấy thông tin sản phẩm cần cập nhật
      const productToUpdate = state.listCart[productIndexToUpdate];
      // Cập nhật thông tin sản phẩm trong giỏ hàng và tính toán total
      const updatedListCart = state.listCart.map((product, index) =>
        index === productIndexToUpdate
          ? {
            ...product,
            quantity: Number(action.payload.quantity),
            total:
              Number(product.product.price) * Number(action.payload.quantity),
          }
          : product
      );
      // Tính toán lại cartTotal dựa trên sự thay đổi số lượng
      const updatedProductTotal =
        Number(action.payload.product.product.price) *
        Number(action.payload.quantity);
      const originalProductTotal =
        Number(productToUpdate.product.price) *
        Number(productToUpdate.quantity);
      const totalDifference = updatedProductTotal - originalProductTotal;
      const updatedCartTotal = state.cartTotal + totalDifference;
      localStorage.setItem(
        "cartState",
        JSON.stringify({
          listCart: updatedListCart,
          cartTotal: updatedCartTotal,
        })
      );
      return {
        ...state,
        listCart: updatedListCart,
        cartTotal: updatedCartTotal,
      };

    case "DELETE_CART":
      // Xóa sản phẩm khỏi giỏ hàng
      const removedProduct = state.listCart.find(
        (product) => product.product["_id"].$oid === action.payload
      );
      const filteredListCart = state.listCart.filter(
        (product) => product.product["_id"].$oid !== action.payload
      );

      // Tính toán lại cartTotal khi xóa sản phẩm
      const cartTotalAfterDelete = state.cartTotal - removedProduct.total;
      localStorage.setItem(
        "cartState",
        JSON.stringify({
          listCart: filteredListCart,
          cartTotal: cartTotalAfterDelete,
        })
      );
      return {
        ...state,
        listCart: filteredListCart,
        cartTotal: cartTotalAfterDelete,
      };

    default:
      return state;
  }
};
export const setLogin = (fullName) => ({ type: "ON_LOGIN", payload: fullName });
export const setLogout = () => ({ type: "ON_LOGOUT" });
export const setDataStore = (data) => ({
  type: "SET_DATA",
  payload: data,
});
export const showPopup = (product) => ({
  type: "SHOW_POPUP",
  payload: product,
});

export const hidePopup = () => ({
  type: "HIDE_POPUP",
});
export const addProductToCart = (product, quantity) => ({
  type: "ADD_CART",
  payload: { product: product, quantity: quantity },
});

export const updateProductInCart = (product, quantity) => ({
  type: "UPDATE_CART",
  payload: { product: product, quantity: quantity },
});

export const removeProductFromCart = (productId) => ({
  type: "DELETE_CART",
  payload: productId,
});

const store = configureStore({
  reducer: { login: LoginReducer, cart: cartReducer },
});
export default store;
