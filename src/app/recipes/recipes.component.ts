import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  fetchingRecipes = false;
  fetchingRecipesSubscription!: Subscription;
  recipesChangeSubscription!: Subscription;

  constructor(
    private recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.recipesChangeSubscription = this.recipeService.recipesChange.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.fetchingRecipesSubscription = this.recipeService.fetchingRecipes.subscribe((fetching: boolean) => {
      this.fetchingRecipes = fetching;
    });
    this.recipeService.fetchRecipesData();
  }

  ngOnDestroy(): void {
    this.recipesChangeSubscription.unsubscribe();
    this.fetchingRecipesSubscription.unsubscribe();
  }
}
