import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';

const routes: Routes = [
  {path: '', component: RecipesComponent},
  {path: 'recipes/new', component: RecipeFormComponent},
  {path: 'recipes/:id/details', component: RecipeDetailsComponent, resolve: {recipe: RecipeResolver}},
  {path: 'recipes/:id/edit', component: RecipeFormComponent, resolve: {recipe: RecipeResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
