import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];
  recipesChange = new Subject<Recipe[]>();
  fetchingRecipes = new Subject<boolean>();


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  fetchRecipesData() {
    this.fetchingRecipes.next(true);
    this.http.get<{ [id: string]: Recipe }>('https://recipes-7707f-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(result => {
        this.fetchingRecipes.next(false);
        if (!result) {
          return [];
        }
        return Object.keys(result).map(id => {
          const recipeData = result[id];
          return new Recipe(
            id,
            recipeData.name,
            recipeData.recipeDescription,
            recipeData.imgUrl,
            recipeData.ingredients,
            recipeData.steps,
          );
        });
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChange.next(recipes);
      }, () => {
        this.fetchingRecipes.next(false);
      });
  }

  fetchRecipe(recipeId: string) {
    return this.http.get<Recipe>(`https://recipes-7707f-default-rtdb.firebaseio.com/recipes/${recipeId}.json`)
      .pipe(map (recipe => {
        return new Recipe(
          recipeId,
          recipe.name,
          recipe.recipeDescription,
          recipe.imgUrl,
          recipe.ingredients,
          recipe.steps,
        )
      }));
  }

  addRecipe(recipe: Recipe) {
    const body = {
      name: recipe.name,
      recipeDescription: recipe.recipeDescription,
      imgUrl: recipe.imgUrl,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    };
    this.http.post('https://recipes-7707f-default-rtdb.firebaseio.com/recipes.json', body).subscribe(() => {
      this.fetchRecipesData();
    });
  }

  removeRecipe(recipe: Recipe) {
    return this.http.delete(`https://recipes-7707f-default-rtdb.firebaseio.com/recipes/${recipe.id}.json`);
  }

  editRecipe(recipe: Recipe) {
    const body = {
      name: recipe.name,
      recipeDescription: recipe.recipeDescription,
      imgUrl: recipe.imgUrl,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    };
    this.http.put(`https://recipes-7707f-default-rtdb.firebaseio.com/recipes/${recipe.id}.json`, body).subscribe(() => {
      void this.router.navigate(['/']);
      this.fetchRecipesData();
    });
  }
}
