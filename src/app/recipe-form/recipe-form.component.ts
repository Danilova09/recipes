import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      recipeDescription: new FormControl('',Validators.required),
      imgUrl: new  FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      stepImg: new FormControl('', Validators.required),
      stepDescription: new FormControl('', Validators.required),
    })
  }

  onSubmit() {
    console.log(this.recipeForm.controls);
  }

  fieldHasErrors(fieldName: string, errorType: string) {
    const field = this.recipeForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }
}
