import MealList from './components/MealList';
import CartModal from './components/CartModal';
import Checkout from './components/Checkout';
import Header from './components/Header';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <CartModal />
        <Checkout />
        <Header />
        <MealList />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
