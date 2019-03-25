import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  FETCH_STREAM_SAGA
} from "../actions/types";
import history from "../history";
import {
  call,
  put,
  takeLatest,
  apply,
  take,
  fork,
  all
} from "redux-saga/effects";
import { fetchStreamSaga } from "../sagas/fetchStreamSaga";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({
    type: CREATE_STREAM,
    payload: response.data
  });

  if (response.status === 201) {
    history.push("/");
  }
}; //return a stream that just created

export const deleteStream = id => async dispatch => {
  const response = await streams.delete(`/streams/${id}`);

  dispatch({
    type: DELETE_STREAM,
    payload: id
  });

  if (response.status === 200) {
    history.push("/");
  }
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data
  });
  if (response.status === 200) {
    history.push("/");
  }
}; //return a stream that just updated

// export const fetchStreams = () => async dispatch => {
//   const response = await streams.get("/streams");
//   dispatch({
//     type: FETCH_STREAMS,
//     payload: response.data
//   });
// }; //return a stream

export const fetchStreams = function*() {
  const response = yield call([streams, streams.get], "/streams");
  yield put({
    type: FETCH_STREAMS,
    payload: response.data
  });
};

export function* watchFetchStreams() {
  yield takeLatest("FETCH_STREAMS_SAGA", fetchStreams);
}

export const fetchStream = function*(id) {
  yield put({
    type: FETCH_STREAM,
    id
  });
};

export function* watchFetchStream() {
  const { id } = yield take(FETCH_STREAM);
  const response = yield apply(streams.get, streams, `/streams/${id}`);
  yield put({
    type: FETCH_STREAM_SAGA,
    payload: response.data
  });
}
