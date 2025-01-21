import { useEffect, useRef } from 'react';

export default function CartModal({
  open,
  onClose,
  cartItems,
  onSubmit,
  onChangeQt,
}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog className="modal cart" ref={dialog} onClose={onClose}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.id} className="cart-item">
            <p>
              {cartItem.name} - {cartItem.qt} x ${cartItem.price}
            </p>
            <div className="cart-item-actions">
              <button onClick={() => onChangeQt(cartItem.id, cartItem.qt - 1)}>
                -
              </button>
              <p>{cartItem.qt}</p>
              <button onClick={() => onChangeQt(cartItem.id, cartItem.qt + 1)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        $
        {cartItems.reduce(
          (prevValue, currValue) => prevValue + currValue.price * currValue.qt,
          0,
        )}
      </div>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button" onClick={onSubmit}>
          Go to Checkout
        </button>
      </div>
    </dialog>
  );
}
