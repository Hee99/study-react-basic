import { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalQt = cartCtx.items.reduce((totalQt, item) => {
    return totalQt + item.qt;
  }, 0);

  function handleOpenCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="React food" />
        <h1>Reactfood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpenCart}>
          Cart({totalQt})
        </Button>
      </nav>
    </header>
  );
}
