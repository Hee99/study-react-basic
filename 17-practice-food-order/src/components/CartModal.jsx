import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import Modal from './UI/Modal';
import UserProgressContext from '../store/UserProgressContext';

export default function CartModal() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const open = userProgressCtx.progress === 'cart';

  const totalAmount = items.reduce(
    (prevValue, currValue) => prevValue + currValue.price * currValue.qt,
    0,
  );

  function handleCloseCart() {
    open && userProgressCtx.hideCart();
  }

  function handleSubmit() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      onClose={handleCloseCart}
      open={open}
      title="Your Cart"
    >
      <ul>
        {items.map((cartItem) => (
          <li key={cartItem.id} className="cart-item">
            <p>
              {cartItem.name} - {cartItem.qt} x
              {currencyFormatter.format(cartItem.price)}
            </p>
            <div className="cart-item-actions">
              <button onClick={() => removeItem(cartItem.id)}>-</button>
              <p>{cartItem.qt}</p>
              <button onClick={() => addItem(cartItem)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">{currencyFormatter.format(totalAmount)}</div>
      <div className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleSubmit}>Go to Checkout</Button>
        )}
      </div>
    </Modal>
  );
}
