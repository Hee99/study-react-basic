import { useEffect, useState } from 'react';
import { MealItem } from './MealItem';

export default function MealList({ onAddCart }) {
  const [meals, setMeals] = useState([]);

  function handleAddCart(selectedId) {
    const selectedItem = meals.find((cartItem) => cartItem.id === selectedId);
    onAddCart(selectedItem);
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/meals');
      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch user places');
      }

      setMeals(resData);
    })();
  });

  return (
    <div id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} {...meal} onSelect={handleAddCart} />
      ))}
    </div>
  );
}
