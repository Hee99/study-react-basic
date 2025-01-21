import { useEffect, useRef } from 'react';

export default function Checkout({ open, onClose, onSubmit, totalAmount }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    onSubmit(formData);
  }

  return (
    <dialog className="modal" ref={dialog} onClose={onClose}>
      <h2>Checkout</h2>
      <p>Total Amount: ${totalAmount}</p>
      <form onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="control ">
          <label htmlFor="street">Street</label>
          <input id="street" name="street" type="text" />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal-code</label>
            <input id="postal-code" name="postal-code" type="text" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" />
          </div>
        </div>

        <div className="modal-actions">
          <button className="text-button" onClick={onClose}>
            Close
          </button>
          <button className="button">Submit order</button>
        </div>
      </form>
    </dialog>
  );
}
