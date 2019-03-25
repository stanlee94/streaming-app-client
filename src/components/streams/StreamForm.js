import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class StreamForm extends React.Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  handleInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    ); //take all property and add to input element as property
  };

  handleSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  renderSubmitButton = () => {
    switch (this.props.name) {
      case "StreamEdit":
        return this.props.currentUserId === this.props.userId ? (
          <div style={{ textAlign: "center" }}>
            <button className="ui button primary">Submit</button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            You don't have permission to edit this stream
          </div>
        );
      case "StreamCreate":
        return (
          <div style={{ textAlign: "center" }}>
            {!this.props.currentUserId ? (
              "You don't have permission to create a stream"
            ) : (
              <button className="ui button primary">Submit</button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.handleInput}
          label="Enter Title: "
        />
        <Field
          name="description"
          component={this.handleInput}
          label="Enter Description: "
        />
        {this.renderSubmitButton()}
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};

  if (!title) {
    errors.title = "Please enter title";
  }

  if (!description) {
    errors.description = "Please enter description";
  }

  return errors;
};

//controlled component: when input changed, it is passed to redux store and then we
//will pass back to input element as value property

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId
  };
};

const wrappedForm = reduxForm({
  form: "streamCreate",
  validate
})(StreamForm);

export default connect(mapStateToProps)(wrappedForm);
