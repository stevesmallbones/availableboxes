import React from 'react';

const BoxSizeComponent = ({ numPortions, numRecipes, boxPrices }) => {
  const portions = numPortions.toString();

  return (
    <div className={`box-size`}>
      {numRecipes.map((recipe, index) => {
        // Check if the prices data exists for the given portions and recipe
        const priceData = boxPrices[portions] && boxPrices[portions][recipe.toString()];
        const recipeTotal = priceData && priceData.gourmet.recipe_total;

        return (
          <div key={index} className={`box-size-item box-${portions}-${recipe} box-${portions}`}>
            <div className="people">{portions}{portions === '1' ? ' 👤' : ' 👥'}</div>
            <div className="recipes">{recipe} 🧆 </div>
            <div className="price">£{recipeTotal || 'N/A'}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BoxSizeComponent;
