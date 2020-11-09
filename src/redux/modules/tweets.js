import call from "api/apiRequest";
import endpoints from "api/endpoints";

const SET_IS_LOADING = "tweets/SET_IS_USERS_LOADING";
const SET_TWEETS_DATA = "tweets/SET_TWEETS_DATA";
const SET_HAS_MORE = "tweets/SET_HAS_MORE"
const RESET_TWEETS = "tweets/RESET_TWEETS";

const initialState = {
  isLoading: true,
  data: [],
  hasMore: true,
  page: 1,
  limit: 10
};

export const getTweets = ( cbSuccess, cbError) => async (dispatch, getState) => {
  dispatch({type: SET_IS_LOADING, payload: true})
  const {tweets: {page, limit}} = getState();
  try {
    const res = await call({
      url: endpoints.tweets,
      params: {page, limit}
    });
    const { data } = res.data;
    dispatch({ type: SET_TWEETS_DATA, payload: data });
    if(data.length <limit){
      dispatch({type: SET_HAS_MORE, payload: false})
    }
    cbSuccess && cbSuccess(data);
  } catch (e) {
    console.log("getTweets err: ", e);
    cbError && cbError(e);
  } finally{
    dispatch({type: SET_IS_LOADING, payload: false})
  }
};

export const postReply = (
  reply = {},
  cbSuccess,
  cbError
) => async dispatch => {
  dispatch({type: SET_IS_LOADING, payload: true})
  try {
    const res = await call({
      method: "post",
      url: endpoints.tweets,
      data: reply
    });
    cbSuccess && cbSuccess(res.data);
  } catch (e) {
    cbError && cbError(e);
  } finally{
    dispatch({type: SET_IS_LOADING, payload: false})
  }
};

export const resetTweets = () => ({ type: RESET_TWEETS });

const getReducer = {
  [SET_IS_LOADING]: ({ state, action: { payload } }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_TWEETS_DATA]: ({ state, action: { payload } }) => ({
    ...state,
    data: [...state.data, ...payload],
    page: state.page+1
  }),
  [SET_HAS_MORE]: ({state, action: {payload}}) => ({
    ...state,
    hasMore: payload
  }),
  [RESET_TWEETS]: () => ({ ...initialState })
};

export default function (state = initialState, action) {
  const { type } = action;
  const doAction = getReducer[type];
  return doAction ? doAction({ state, action }) : state;
}