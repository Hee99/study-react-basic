import { MealItem } from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './UI/Error';

const requestConfig = {};

export default function MealList() {
  const {
    data: meals,
    error,
    loading,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (loading) {
    return <p className="center">Fetching meals....</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
