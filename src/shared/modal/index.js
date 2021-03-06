import { Fragment } from "react";

export const Modal = ({ children, closeModal }) => {
  return (
    <Fragment>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="close-button">
            <button onClick={closeModal}>
              <i className="far fa-times-circle"></i>
            </button>
          </div>
          {children}
        </div>
      </div>
    </Fragment>
  );
};
