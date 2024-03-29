import React, { useState , useEffect } from 'react';
import './RecipeDialog.css';
import Axios from 'axios';

const RecipeDialog = ({ foodName }) => {
  
  const app_id = 'e243a229';
  const app_key = '0dc63dbb444368a2123c9de54be9884e';
  const url = `https://api.edamam.com/search?q=${foodName}&app_id=${app_id}&app_key=${app_key}`;
  
  const [showRecipe, setShowRecipe] = useState(true);
  const handleRecipeClick = () => setShowRecipe(true);
  const handleNutritionalClick = () => setShowRecipe(false);
  
  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    return ([result.data.hits[0]]); //set to 0 to return first hit so one result can play around with this
  };
  
  function GetContent(){
    const [recipes, setRecipe] = useState();
    useEffect(() => {
      getRecipeInfo().then((data) => setRecipe(data));
    }, []);
    // const recipes = getRecipeInfo(); 
    if(recipes){
        console.log(recipes[0].recipe);
        if(showRecipe){
          return(
            <div>
            <h2>{recipes[0].recipe.label}</h2>
            <ul>
            {recipes[0].recipe.ingredients.map(
              (line, lineIndex) => (
                <li key={lineIndex}>{line.text}</li>
                )
                )}
              </ul>
              </div>
              )
            }
        else{
          return(
            <div>
              <h2>{recipes[0].recipe.label}</h2>
              <ul>
              {Object.keys(recipes[0]['recipe']['totalNutrients']).map(
                  (key) => {
                    const value =
                      recipes[0]['recipe']['totalNutrients'][key];
                    return (
                      <li key={key}>
                        {value.label}: {Math.round(value.quantity)}{' '}
                        {value.unit}
                      </li>
                    );
                  },
                )}
                </ul>
              </div>
              )
        }
        }
      };
      
      return (
        <div id="recipe-dialog">
        <div id="content-area">
        <GetContent/>
        </div>
        <button onClick={handleRecipeClick}>Recipe</button>
        <button onClick={handleNutritionalClick}>Nutritional Info</button>
        </div>
        );
      };
      
      export default RecipeDialog;
      
      