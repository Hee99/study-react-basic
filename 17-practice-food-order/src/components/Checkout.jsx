import { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import Modal from './UI/Modal';
import UserProgressContext from '../store/UserProgressContext';
import Input from './UI/Input';
import useHttp from '../hooks/useHttp';
import Error from './UI/Error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cart = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, loading, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig,
  );

  const open = userProgressCtx.progress === 'checkout';

  const totalAmount = cart.items.reduce(
    (prevValue, currItem) => prevValue + currItem.price * currItem.qt,
    0,
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cart.initItems();
    clearData();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cart.items,
          customer: formData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  );

  if (loading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
        title="Success!"
      >
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
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

        {error && <Error title="Failed to submit order" message={error} />}

        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
