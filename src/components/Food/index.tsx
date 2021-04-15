import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";
import { FoodProps } from "../../interfaces/Food/Food";

interface FoodComponentProps {
  isAvailable: boolean;
  food: FoodProps;
  handleEditFood(food: FoodProps): void;
  handleDelete(id: number): Promise<void>;
}

const Food: React.FC<FoodComponentProps> = ({
  isAvailable,
  food,
  handleEditFood,
  handleDelete,
}: FoodComponentProps) => {
  const [foodAvailable, setFoodAvailable] = useState(isAvailable);

  const setEditingFood = (foodSetting: FoodProps) => {
    handleEditFood(foodSetting);
  };

  const toggleAvailable = async (foodToggle: FoodProps) => {
    await api.put(`/foods/${foodToggle.id}`, {
      ...food,
      available: !isAvailable,
    });

    setFoodAvailable(!foodAvailable);
  };

  return (
    <Container available={foodAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{foodAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={foodAvailable}
              onChange={() => toggleAvailable(food)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
