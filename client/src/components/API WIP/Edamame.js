import Axios from 'axios';

// const url = `https://api.edamam.com/search?q=${foodName}&app_id=${app_id}&app_key=${app_key}`;

const getRecipeInfo = async (foodName) => {
  const app_id = 'e243a229';
  const app_key = '0dc63dbb444368a2123c9de54be9884e';
  var result = await Axios.get(
    `https://api.edamam.com/search?q=${foodName}&app_id=${app_id}&app_key=${app_key}`,
  );
  return [result.data.hits[0]];
};

export default getRecipeInfo;
