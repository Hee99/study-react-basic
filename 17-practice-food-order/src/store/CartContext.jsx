import { createContext, useReducer } from 'react';

function cartReducer(state, action) {
  let items = [...state.items];
  if (action.type === 'ADD') {
    const duplicateItemIdx = items.findIndex(
      (cartItem) => cartItem.id === action.selectedItem.id,
    );
    const duplicateItem = items[duplicateItemIdx];

    if (duplicateItem) {
      items[duplicateItemIdx] = { ...duplicateItem, qt: duplicateItem.qt + 1 };
    } else {
      items.push({ ...action.selectedItem, qt: 1 });
    }
  } else if (action.type === 'INIT') {
    items = [];
  } else if (action.type === 'REMOVE') {
    const existingItemIndex = items.findIndex(
      (cartItem) => cartItem.id === action.selectedId,
    );
    const existingItem = items[existingItemIndex];

    if (existingItem.qt === 1) {
      items.splice(existingItemIndex, 1);
    } else {
      items[existingItemIndex] = { ...existingItem, qt: existingItem.qt - 1 };
    }
  }
  return { ...state, items };
}

const CartContext = createContext({
  items: [],
  customer: {},
  addItem: (item) => {},
  removeItem: (id) => {},
  initItems: () => {},
  setCustomer: (data) => {},
});

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(selectedItem) {
    dispatch({ type: 'ADD', selectedItem });
  }

  function removeItem(selectedId) {
    dispatch({ type: 'REMOVE', selectedId });
  }

  function initItems() {
    dispatch({ type: 'INIT' });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    initItems,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
