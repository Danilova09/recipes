import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];
  recipesChange = new Subject<Recipe[]>();
  fetchingRecipes = new Subject<boolean>();


  constructor(
    private http: HttpClient,
  ) {}

  fetchRecipesData() {
    this.fetchingRecipes.next(true);
    this.http.get<{[id: string]: Recipe}>('https://recipes-56e21-default-rtdb.firebaseio.com/')
      .pipe(map(result => {
          this.fetchingRecipes.next(false);
          return Object.keys(result).map(id => {
            const recipeData = result[id];
            return new Recipe(
              id,
              recipeData.name,
              recipeData.recipeDescription,
              recipeData.imgUrl,
              recipeData.ingredients,
              recipeData.steps,
            )
          })
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChange.next(recipes);
      }, () => {
        this.fetchingRecipes.next(false);
      });
  }

  addRecipe(recipe: Recipe) {
    const body = {
      name: recipe.name,
      recipeDescription: recipe.recipeDescription,
      imgUrl: recipe.imgUrl,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    }
    this.http.post('https://recipes-56e21-default-rtdb.firebaseio.com/recipes.json', body).subscribe((result => {
      console.log(result);
    }))
  }

}
