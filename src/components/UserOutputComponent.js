import React from 'react';
import BoxSizeComponent from './BoxSizeComponent';

const UserOutputComponent = ({ userId, description, boxSizes, boxPrices }) => (
  <div className="user-output">
    <h2>User ID: {userId}</h2>
    <h3>{description && <>Description: {description}</>}</h3>
    {boxSizes.map((boxSize, idx) => (
      <BoxSizeComponent key={idx} numPortions={boxSize.numPortions} numRecipes={boxSize.numRecipes} boxPrices={boxPrices} />
    ))}
  </div>
);

export default UserOutputComponent;
