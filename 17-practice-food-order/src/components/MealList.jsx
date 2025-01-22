import { useEffect, useState } from 'react';
import { MealItem } from './MealItem';

export default function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/meals');
      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch user places');
      }

      setMeals(resData);
    })();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
