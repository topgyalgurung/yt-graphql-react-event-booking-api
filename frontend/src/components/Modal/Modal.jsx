import PropTypes from "prop-types";
import "./Modal.css";
const Modal = ({
  title,
  children,
  canCancel,
  canConfirm = false,
  onCancel = false,
  onConfirm,
}) => {
  return (
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <section className="modal__content"> {children}</section>
      <section className="modal__actions">
        {canCancel && (
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
        {canConfirm && (
          <button className="btn" onClick={onConfirm}>
            Confirm
          </button>
        )}
      </section>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  canCancel: PropTypes.bool,
  canConfirm: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};
export default Modal;
