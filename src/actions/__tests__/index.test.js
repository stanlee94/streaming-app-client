import { fetchStreams } from "../index";
import streams from "../../apis/streams";
import { call, put } from "redux-saga/effects";
import { FETCH_STREAMS } from "../types";

it("get list of streams and dispatch action", () => {
  const response = { data: 42 };
  const gen = fetchStreams();
  expect(gen.next().value).toEqual(call([streams, streams.get], "/streams"));
  expect(gen.next(response).value).toEqual(
    put({
      type: FETCH_STREAMS,
      payload: 42
    })
  );
});
