import call from "api/apiRequest";
import endpoints from "api/endpoints";

const SET_IS_LOADING = "auth/SET_IS_USERS_LOADING";
const SET_IS_FETCHING = "auth/SET_IS_USERS_FETCHING";
const SET_AUTH = "auth/SET_AUTH";
const RESET_AUTH = "auth/RESET_AUTH";

const initialState = {
  isLoading: false,
  isFetching: true,
  user: {}
};

export const login = (loginData, cbSuccess, cbError) => async dispatch => {
  dispatch({type: SET_IS_LOADING, payload: true})
  try {
    const res = await call({
      method: "post",
      url: endpoints.login,
      data: loginData
    });
    const { data } = res.data;
    dispatch({ type: SET_AUTH, payload: data });
    cbSuccess && cbSuccess(data);
  } catch (e) {
    console.log("login err: ", e);
    cbError && cbError(e);
  } finally{
    dispatch({type: SET_IS_LOADING, payload: false})
  }
};

export const register = (
  registerData,
  cbSuccess,
  cbError
) => async dispatch => {
  dispatch({type: SET_IS_LOADING, payload: true})
  try {
    const res = await call({
      method: "post",
      url: endpoints.register,
      data: registerData
    });
    cbSuccess && cbSuccess(data);
  } catch (e) {
    cbError && cbError(e);
  } finally{
    dispatch({type: SET_IS_LOADING, payload: false})
  }
};

export const getCurrentUser = (cbSuccess, cbError) => async dispatch => {
  dispatch({type: SET_IS_FETCHING, payload: true})
  try{
    const res = await call({ url: endpoints.currentUser });
    const { data } = res.data;
    cbSuccess && cbSuccess(data || {});
    dispatch({ type: SET_AUTH, payload: data });
  } catch(e){
    cbError && cbError(e);
  }finally{
    dispatch({type: SET_IS_FETCHING, payload: false})
  }
  
};

export const resetUsers = () => ({ type: RESET_USERS });

const getReducer = {
  [SET_IS_LOADING]: ({ state, action: { payload } }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_FETCHING]: ({ state, action: { payload } }) => ({
    ...state,
    isFetching: payload
  }),
  [SET_AUTH]: ({ state, action: { payload } }) => ({
    ...state,
    user: payload || {}
  }),
  [RESET_AUTH]: () => ({ ...initialState })
};

export default function (state = initialState, action) {
  const { type } = action;
  const doAction = getReducer[type];
  return doAction ? doAction({ state, action }) : state;
}