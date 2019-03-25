import { FETCH_STREAM_SAGA } from "../actions/types";
import { apply, put } from "redux-saga/effects";
import streams from "../apis/streams";

export const fetchStreamSaga = function*(id) {
  const response = yield apply(streams.get, streams, `/streams/${id}`);
  yield put({
    type: FETCH_STREAM_SAGA,
    payload: response.data
  });
};
