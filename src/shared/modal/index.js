import { Fragment } from "react";

function Modal ({ children, closeModal }) {
  let mediaQ = matchMedia('(max-width: 1024px)');
  return (
    mediaQ.matches && 
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

export default Modal;
