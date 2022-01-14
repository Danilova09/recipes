import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.recipe = <Recipe>data.recipe;
    });
  }

  remove() {
    this.recipeService.removeRecipe(this.recipe).subscribe(() => {
      void this.router.navigate(['/']);
      this.recipeService.fetchRecipesData();
    });
  }
}
