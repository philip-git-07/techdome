import { LOGIN_SUCCESS, LOAD_SUCCESS, LOGOUT_SUCCESS, LOGIN_REQUEST, LOAD_REQUEST, LOAD_FAIL } from "../constants/userConstants";
import axios from "../apiConfig/api";

export const registerUser = (userData, navigate, fun) => async () => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/register", userData, config);
    if (res.status === 201) {
      navigate("/login");
    } else {
      window.alert("Something went wrong");
    }
    fun(null);
  } catch (error) {
    fun(error.response.data.message);
    console.error(error);
  }
};

export const loginUser = (userData, fun) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/login", userData, config);
    if (res.status === 200) {
      localStorage.setItem("userToken", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
    } else {
      window.alert("Something went wrong");
    }
    fun(null);
  } catch (error) {
    dispatch({ type: LOAD_FAIL });
    fun(error.response.data.message);
    console.error(error);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });
    const token = localStorage.getItem("userToken");
    if (token) {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post("/get_user_data", { token }, config);
      dispatch({ type: LOAD_SUCCESS, payload: res.data.user });
    } else {
      console.log("Token is not present!");
    }
  } catch (error) {
    dispatch({ type: LOAD_FAIL });
    console.error(error);
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    localStorage.removeItem("userToken");
    dispatch({ type: LOGOUT_SUCCESS });
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};
