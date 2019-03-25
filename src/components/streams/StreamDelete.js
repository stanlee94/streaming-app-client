import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";

const StreamDelete = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const renderContent = () => {
    if (props.stream) {
      if (props.currentUserId !== props.stream.userId) {
        return (
          <div style={{ textAlign: "center" }}>
            You don't have permission to delete this stream
          </div>
        );
      }
    }

    if (props.stream) {
      return <p>{`Are you sure you want to delete ${props.stream.title}?`}</p>;
    } else {
      return null;
    }
  };

  const renderAction = () => {
    if (props.stream) {
      if (props.currentUserId !== props.stream.userId) {
        return null;
      }
    }

    return (
      <>
        <button
          onClick={() => props.deleteStream(props.match.params.id)}
          className="ui button red"
        >
          Delete
        </button>
        <button onClick={() => history.push("/")} className="ui button">
          Cancel
        </button>
      </>
    );
  };

  return (
    <Modal
      header="Delete Stream"
      onClick={() => history.push("/")}
      content={renderContent()}
      action={renderAction()}
    />
  );
};

const mapStateToProps = (state, props) => {
  return {
    stream: state.streams[props.match.params.id],
    currentUserId: state.auth.userId
  };
};

//As far as our concern, this modal is being rendered under StreamDelete. But from DOM point of view, it is rendered with the same level of root.
export default connect(
  mapStateToProps,
  { deleteStream, fetchStream }
)(StreamDelete);
