import axiosInstance from "../utils/axiosInstance";

export const loadCart = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_CART_REQUEST" });
    const res = await axiosInstance.get("660/cart");
    dispatch({ type: "LOAD_CART_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "LOAD_CART_FAIL", payload: error });
    if (error.message === "Please Log in again") {
      logOut();
    }
  }
};

export const addCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_CART_REQUEST" });
    const res = await axiosInstance.post("660/cart", data);
    dispatch({ type: "ADD_CART_SUCCESS", payload: res });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_CART_FAIL", payload: error });
  }
};

export const updateCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CART_REQUEST" });
    const res = await axiosInstance.put(`660/cart/${data.id}`, data);
    dispatch({ type: "UPDATE_CART_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "UPDATE_CART_FAIL", payload: error });
  }
};

export const deleteCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_CART_REQUEST" });
    await axiosInstance.delete(`660/cart/${data.id}`, data);
    dispatch({ type: "DELETE_CART_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_CART_FAIL", payload: error });
  }
};
