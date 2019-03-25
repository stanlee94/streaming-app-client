import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

const StreamEdit = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        userId={props.stream.userId}
        name="StreamEdit"
        initialValues={_.pick(props.stream, "title", "description")}
        onSubmit={formValues => {
          props.editStream(props.match.params.id, formValues);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    stream: state.streams[props.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
