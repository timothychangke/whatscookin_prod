import { useState, useEffect } from 'react';
import Axios from 'axios';

/**
 * This function, `Axiosrecipecall`, utilizes the Edamam API to retrieve recipe information based on user input. It leverages React hooks to manage state for the search query and retrieved recipes. 
 * Users can enter a food item in the search bar, and upon submission, the function fetches recipe data from the Edamam API and displays the first recipe's label and ingredients list.  
 * 
 * @date 27/03/2024 - 00:56:10
 *
 * @returns {*}
 */
function Axiosrecipecall() {
  const [query, setquery] = useState('');
  const [recipes, setrecipes] = useState([]);

  const app_id = 'e243a229';
  const app_key = '0dc63dbb444368a2123c9de54be9884e';
  const url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };
  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes([result.data.hits[0]]); //set to 0 to return first hit so one result can play around with this
    console.log(result.data.hits);
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter Food "
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <div>
        {recipes.map((recipe) => {
          return (
            <div>
              <h2>{recipe['recipe']['label']}</h2>
              <ul>
                {recipe['recipe']['ingredients'].map((line, lineIndex) => (
                  <li key={lineIndex}>{line.text}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Axiosrecipecall;
