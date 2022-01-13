import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private recipeService: RecipeService,
  ) {
  }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      recipeDescription: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      steps: new FormArray([
        new FormGroup({
          stepImg: new FormControl('', Validators.required),
          stepDescription: new FormControl('', Validators.required)
        })
      ])
    });
  }

  onSubmit() {
    const recipe = new Recipe(
      'id',
      this.recipeForm.controls.name.value,
      this.recipeForm.controls.recipeDescription.value,
      this.recipeForm.controls.imgUrl.value,
      this.recipeForm.controls.ingredients.value,
      this.recipeForm.controls.steps.value,
    )
    this.recipeService.addRecipe(recipe);
  }

  fieldHasErrors(fieldName: string, errorType: string) {
    const field = this.recipeForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  addStep() {
    const steps = <FormArray>this.recipeForm.get('steps');
    const newStep = new FormGroup({
      stepImg: new FormControl('', Validators.required),
      stepDescription: new FormControl('', Validators.required),
    });
    steps.push(newStep);
  }

  getStepsControls() {
    const steps = <FormArray>this.recipeForm.get('steps');
    return steps.controls;
  }


}
