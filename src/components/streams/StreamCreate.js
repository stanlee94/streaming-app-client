import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm
          name="StreamCreate"
          onSubmit={formValues => {
            this.props.createStream(formValues);
          }}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);
