import React, {Component} from 'react';
import styles from "./Recipe.module.css";
import axios from 'axios';
import withNavBar from "../../HOCs/withNavBar";

class RecipeDetails extends Component {

  state = {
    recipe: null
  };

  componentDidMount() {
    console.log("[RecipeDetails] props:", this.props);
    axios.get(`http://172.22.13.38:1323/recipe/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ recipe: response.data });
      });
  }

  render() {

    const { recipe } = this.state;

    return (
      <>
        { recipe
          ?
          <div className={styles.recipe}>
            <h3>{recipe.title}</h3>
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map(ingredient => <li key={`${recipe.id}${ingredient}`}>{ingredient}</li>)}
            </ul>
            <h4>Instructions</h4>
            <p>{recipe.instructions}</p>
          </div>
          :
          <div>No recipe found.</div>
        }
      </>
    );
  }
}

export default withNavBar(RecipeDetails, true);