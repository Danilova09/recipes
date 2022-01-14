export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public recipeDescription: string,
    public imgUrl: string,
    public ingredients: string,
    public steps: [{
      stepImg: string,
      stepDescription: string,
    }]
  ) {}
}
