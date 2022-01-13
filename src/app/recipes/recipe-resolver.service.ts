import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../shared/recipe.model';
import { EMPTY, Observable, of } from 'rxjs';
import { RecipeService } from '../shared/recipe.service';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Observable<never> {
    const recipeId = route.params['id'];
    return this.recipeService.fetchRecipe(recipeId).pipe(mergeMap(recipe => {
        if (recipe) {
          return of(recipe);
        }
        void this.router.navigate(['/']);
        return EMPTY;
      }
    ));
  }
}
