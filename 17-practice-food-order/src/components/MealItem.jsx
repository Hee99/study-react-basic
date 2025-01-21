export function MealItem({ id, name, price, description, image, onSelect }) {
  return (
    <div className="meal-item">
      <img src={'http://localhost:3000/' + image} />
      <h3>{name}</h3>
      <p className="meal-item-price">${price}</p>
      <p className="meal-item-description">{description}</p>
      <div className="meal-item-actions">
        <button className="button" onClick={() => onSelect(id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
