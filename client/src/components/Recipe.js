// import './components/Axiosrecipecall.jsx';
import { useState, useEffect} from 'react';
import Axios from 'axios';

//make dialog box when button clicked
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function Recipe() {
    const [open, setOpen] = useState(false);
    const handleClickToOpen = () => {
      setOpen(true);
    };
    const handleToClose = () => {
      setOpen(false);
    };
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]); 

    const [showRecipe, setShowRecipe] = useState(false); 
    const [showNutrition, setShowNutrition] = useState(false);

    //set condition to display dialog box of recipe
    const displayRecipe = () =>{
        handleClickToOpen();
        setShowRecipe(true);
    };
    //set condition to display dialog box of nutrition
    const displayNutrition = () =>{
        handleClickToOpen();
        setShowNutrition(true);
    };

    const closeRecipe = () =>{
        handleToClose();
        setShowRecipe(false);
    }

    const closeNutrition = () =>{
        handleToClose();
        setShowNutrition(false);
    }


    const app_id = "e243a229";
    const app_key = "0dc63dbb444368a2123c9de54be9884e";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;
  
    
  
    const onSubmit = (e) =>{
      e.preventDefault();
      getRecipeInfo();
    }
  
    const getRecipeInfo = async () => {
      var result = await Axios.get(url);
      setRecipes([result.data.hits[0]]); //set to 0 to return first hit so one result can play around with this
      console.log(result.data.hits);
    };
  
    console.log(recipes);
    return(
      <div className='container'>
        <form onSubmit={onSubmit} >
          <input type="text"
            placeholder='Enter Food ' 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        <button onClick={() => displayRecipe()}>Recipe</button>
        <button onClick={() => displayNutrition()}>Nutritional Facts</button>
        </form>
        <div>
            {recipes.map(recipe=>{
                return(
                    
            <div>
                {showRecipe && (
                 <Dialog open={open} onClose={closeRecipe}>
                  <DialogContent>
                      <DialogContentText>
                        <h2>{recipe["recipe"]["label"]}</h2>
                        <ul>
                          {recipe["recipe"]["ingredients"].map((line,lineIndex) => (
                            <li key={lineIndex}>{line.text}</li>
                            
                          ))}
                        </ul>
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={closeRecipe}
                          color="primary" autoFocus>
                          Close
                      </Button>
                  </DialogActions>
              </Dialog>
                )}

                {showNutrition && (
                 <Dialog open={open} onClose={closeNutrition}>
                  <DialogContent>
                      <DialogContentText>
                        <h2>{recipe["recipe"]["label"]}</h2>
                        <ul>
                        {Object.keys(recipe["recipe"]["totalNutrients"]).map(key => {
                        const value = recipe["recipe"]["totalNutrients"][key];
                        return <li key={key}>{value.label}: {Math.round(value.quantity)} {value.unit}</li>;
                        })}
                        </ul>
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={closeNutrition}
                          color="primary" autoFocus>
                          Close
                      </Button>
                  </DialogActions>
              </Dialog>
                )}
            </div>
            )
            })}

            
        </div>

                

    </div>

        
    
    )
  }

export default Recipe;