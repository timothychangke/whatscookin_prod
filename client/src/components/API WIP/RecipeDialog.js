import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useTheme } from '@mui/material';
import getAllFoodData from './FoodData'; // Make sure this import path is correct
import './RecipeDialog.css';

const RecipeDialog = ({ foodName }) => {
  const [activeTab, setActiveTab] = useState('recipe');
  const [data, setData] = useState({
    ingredients: [],
    nutrients: {},
    recipeContent: '',
  });

  const { palette } = useTheme();
  const tabStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: palette.primary.light,
    padding: '0.6rem',
    margin: '0.3rem',
    border: 'none',
    cursor: 'pointer',
  };

  const contentAreaStyle = {
    maxHeight: '500px',
    overflowY: 'auto',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllFoodData(foodName);
        setData(allData);
      } catch (error) {
        console.error('Failed to fetch recipe data', error);
      }
    };

    fetchData();
  }, [foodName]);

  const renderRecipe = () => (
    <div>
      <h2>Recipe Ingredients</h2>
      <ul>
        {data.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );

  const renderNutrition = () => (
    <div>
      <h2>Nutritional Information</h2>
      <ul>
        {Object.entries(data.nutrients).map(([key, value]) => (
          <li key={key}>
            {value.label}: {Math.round(value.quantity)} {value.unit}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderContent = () => {
    // Assuming each step is separated by a newline character in `data.recipeContent`
    const steps = data.recipeContent
      .split('\n')
      .map((step, index) => step.trim())
      .filter((step) => step.length > 0);

    return (
      <div>
        <h2> Recipe Content</h2>
        <ol>
          {steps.map((step, index) => (
            <li className="list">{step}</li>
          ))}
        </ol>
      </div>
    );
  };

  const getContent = () => {
    switch (activeTab) {
      case 'recipe':
        return renderRecipe();
      case 'nutrition':
        return renderNutrition();
      case 'content':
        return renderContent();
      default:
        return <p>Select a tab to view data.</p>;
    }
  };

  return (
    <div
      id="recipe-dialog"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div style={tabStyle}>
        <button style={buttonStyle} onClick={() => setActiveTab('recipe')}>
          Ingredients
        </button>
        <button style={buttonStyle} onClick={() => setActiveTab('nutrition')}>
          Nutritional Info
        </button>
        <button style={buttonStyle} onClick={() => setActiveTab('content')}>
          Recipe Content
        </button>
      </div>
      <div id="content-area" style={contentAreaStyle}>
        {data.ingredients.length > 0 ? getContent() : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default RecipeDialog;
