import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';

export function MealItem({ meal }) {
  const cart = useContext(CartContext);

  function handleAddCart() {
    cart.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={'http://localhost:3000/' + meal.image} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
