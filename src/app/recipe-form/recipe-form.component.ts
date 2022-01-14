import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  isEdit = false;
  recipeId = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
  ) {}

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
        }),
      ])
    });

    this.route.data.subscribe(data => {
      const recipe = <Recipe>data.recipe;
      if (recipe) {
        const steps = <FormArray>this.recipeForm.get('steps');
        for (let i = 0; i < recipe.steps.length - 1; i++) {
          const formGroup = new FormGroup({
            stepImg: new FormControl('', Validators.required),
            stepDescription: new FormControl('', Validators.required)
          });
          steps.push(formGroup);
        }
        this.isEdit = true;
        this.recipeId = recipe.id;
        this.setFormValues({
          name: recipe.name,
          recipeDescription: recipe.recipeDescription,
          imgUrl: recipe.imgUrl,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
        });
      } else {
        this.isEdit = false;
        this.setFormValues({
          name: '',
          recipeDescription: '',
          imgUrl: '',
          ingredients: '',
          steps: [{
            stepImg: '',
            stepDescription: '',
          }],
        });
      }
    });
  }

  setFormValues(value: { [keys: string]: any }) {
    setTimeout(() => {
      this.recipeForm.setValue(value);
    });
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeId,
      this.recipeForm.controls.name.value,
      this.recipeForm.controls.recipeDescription.value,
      this.recipeForm.controls.imgUrl.value,
      this.recipeForm.controls.ingredients.value,
      this.recipeForm.controls.steps.value,
    );
    if (this.isEdit) {
      this.recipeService.editRecipe(recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
  }

  fieldHasErrors(fieldName: string, errorType: string) {
    const field = this.recipeForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  stepFieldHasError(fieldName: string, errorType: string, index: number) {
    const steps = this.recipeForm.get('steps') as FormArray;
    const fieldGroup =  steps.at(index);
    const field = fieldGroup.get(fieldName);
    return  Boolean(field && field.touched && field.errors?.[errorType]);
  }

  getStepsControls() {
    const steps = <FormArray>this.recipeForm.get('steps');
    return steps.controls;
  }

  addStep() {
    const steps = <FormArray>this.recipeForm.get('steps');
    const newStep = new FormGroup({
      stepImg: new FormControl('', Validators.required),
      stepDescription: new FormControl('', Validators.required),
    });
    steps.push(newStep);
  }

  deleteStep(index: number) {
    const stepsArray = <FormArray>this.recipeForm.get('steps');
    stepsArray.removeAt(index);
  }
}
