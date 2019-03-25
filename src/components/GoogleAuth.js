import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = props => {
  let auth;

  const handleSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const handleChange = isSignedIn => {
    if (isSignedIn) {
      props.signIn(auth.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "265361875244-3u00lnuane1mif9decui85b8d0bi96sc.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          handleChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(handleChange);
        });
    });
  }, []);

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button onClick={handleSignOut} className="ui blue button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={handleSignIn} className="ui blue button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
