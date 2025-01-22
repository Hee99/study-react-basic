import { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import Modal from './UI/Modal';
import UserProgressContext from '../store/UserProgressContext';
import Input from './UI/Input';

export default function Checkout() {
  const cart = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const open = userProgressCtx.progress === 'checkout';

  const totalAmount = cart.items.reduce(
    (prevValue, currItem) => prevValue + currItem.price * currItem.qt,
    0,
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      body: JSON.stringify({
        order: {
          items: cart.items,
          customer: formData,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert('주문 성공');

    cart.initItems();
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal title="Checkout" open={open} onClose={handleCloseCheckout}>
      <p>Total Amount: ${totalAmount}</p>

      <form onSubmit={handleSubmit}>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal-code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        <div className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit order</Button>
        </div>
      </form>
    </Modal>
  );
}
