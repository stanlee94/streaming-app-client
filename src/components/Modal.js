import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onClick} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.header}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.action}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
