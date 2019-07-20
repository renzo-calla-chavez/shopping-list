import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params.id !== undefined;
      this.recipe = this.recipeService.getRecipe(+params.id);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      if (this.recipe.ingredients) {
        this.recipe.ingredients.forEach(({ name, amount }) => {
          ingredients.push(
            new FormGroup({
              name: new FormControl(name, [Validators.required]),
              amount: new FormControl(amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      ingredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipe.name = this.recipeForm.value['name'];
      this.recipe.imagePath = this.recipeForm.value['imagePath'];
      this.recipe.description = this.recipeForm.value['description'];
      this.recipe.ingredients = this.recipeForm.value['ingredients'];

      this.recipeService.updateRecipe(this.recipeForm.value);
    } else {
      const newRecipe = new Recipe(
        new Date().getTime(),
        this.recipeForm.value.name,
        this.recipeForm.value.imagePath,
        this.recipeForm.value.description,
        this.recipeForm.value.ingredients
      );
      this.recipeService.updateRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['recipes']);
  }

  onDeleteIngredient(i: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }
}
