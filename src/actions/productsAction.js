import axiosInstance from "../utils/axiosInstance";

export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_PRODUCTS_REQUEST" });
    const res = await axiosInstance.get("660/products");
    dispatch({ type: "LOAD_PRODUCTS_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "LOAD_PRODUCTS_FAIL", payload: error });
    if (error.message === "Please Log in again") {
      logOut();
    }
  }
};
