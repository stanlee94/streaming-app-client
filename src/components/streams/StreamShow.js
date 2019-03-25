import React, { useEffect, useRef, useState } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { FETCH_STREAM } from "../../actions/types";

const StreamShow = props => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(false);

  useEffect(() => {
    const { id } = props.match.params;

    props.fetchStream(id);

    if (props.stream && !player) {
      const flvPlayer = flv.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${id}.flv`
      });

      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      setPlayer(true);
    }
  }, []);

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{props.stream.title}</h1>
      <h4>{props.stream.description}</h4>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    stream: state.streams[props.match.params.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStream: id => dispatch({ type: FETCH_STREAM, id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamShow);
