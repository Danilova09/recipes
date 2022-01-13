import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/recipe.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  removingRecipe = false;

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.removingRecipe = true;
      this.recipeService.removeRecipe(this.recipe).pipe(
        tap(() => {
          this.removingRecipe = false;
        })).subscribe(() => {
          this.recipeService.fetchRecipesData();
      }, () => {
          this.removingRecipe = false;
      });
  }
}
