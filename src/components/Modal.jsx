import "./Modal.css";

const Modal = ({ children, open, close }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={close}>
            <span className="material-symbols-rounded">close</span>
          </button>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
