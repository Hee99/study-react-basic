import MealList from './components/MealList';
import CartModal from './components/CartModal';
import { useReducer, useState } from 'react';
import Checkout from './components/Checkout';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      var duplicateItem = state.find(
        (cartItem) => cartItem.id === action.selectedItem.id,
      );

      if (duplicateItem) {
        return state.map((cartItem) => ({
          ...cartItem,
          qt:
            cartItem.id === action.selectedItem.id
              ? cartItem.qt + 1
              : cartItem.qt,
        }));
      } else {
        return [{ ...action.selectedItem, qt: 1 }, ...state];
      }
    case 'EDIT':
      return state.map((cartItem) => {
        if (cartItem.id === action.selectedId && action.changeQt > 0) {
          return { ...cartItem, qt: action.changeQt };
        } else {
          return cartItem;
        }
      });
    case 'INIT':
      return [];
    default:
      return state;
  }
}

function App() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);

  const [cartItems, dispatch] = useReducer(reducer, []);

  const totalAmount = cartItems.reduce(
    (prevValue, currItem) => prevValue + currItem.price * currItem.qt,
    0,
  );

  function handleChangeQt(selectedId, changeQt) {
    dispatch({ type: 'EDIT', selectedId, changeQt });
    // setCartItems((prevCartList) => {
    //   return prevCartList.map((cartItem) => {
    //     if (cartItem.id === selectedId && changeQt > 0) {
    //       return { ...cartItem, qt: changeQt };
    //     } else {
    //       return cartItem;
    //     }
    //   });
    // });
  }

  function handleAddCart(selectedItem) {
    dispatch({ type: 'ADD', selectedItem });
    // setCartItems((prevCartList) => {
    //   const duplicateItem = prevCartList.find(
    //     (cartItem) => cartItem.id === selectedItem.id,
    //   );

    //   if (duplicateItem) {
    //     return prevCartList.map((cartItem) => ({
    //       ...cartItem,
    //       qt: cartItem.id === selectedItem.id ? cartItem.qt + 1 : cartItem.qt,
    //     }));
    //   } else {
    //     return [{ ...selectedItem, qt: 1 }, ...prevCartList];
    //   }
    // });
  }

  function handleCheckout() {
    setCartModalOpen(false);
    setCheckoutModalOpen(true);
  }

  async function handleOrder(inputValues) {
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      body: JSON.stringify({
        order: {
          items: cartItems,
          customer: inputValues,
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

    dispatch({ type: 'INIT' });
    setCheckoutModalOpen(false);
  }

  return (
    <>
      {cartModalOpen && (
        <CartModal
          open={cartModalOpen}
          cartItems={cartItems}
          onChangeQt={handleChangeQt}
          onSubmit={handleCheckout}
          onClose={() => setCartModalOpen(false)}
        />
      )}
      {checkoutModalOpen && (
        <Checkout
          open={checkoutModalOpen}
          totalAmount={totalAmount}
          onSubmit={handleOrder}
          onClose={() => setCheckoutModalOpen(false)}
        />
      )}
      <header id="main-header">
        <div id="title">
          <img src="/logo.jpg" alt="React food" />
          <h1>Reactfood</h1>
        </div>
        <button className="text-button" onClick={() => setCartModalOpen(true)}>
          Cart({cartItems.length})
        </button>
      </header>
      <MealList onAddCart={handleAddCart} />
    </>
  );
}

export default App;
