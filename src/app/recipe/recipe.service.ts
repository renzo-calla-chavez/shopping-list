import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      0,
      'A Test Recipe',
      'this is simply a test',
      'https://media3.s-nbcnews.com/j/MSNBC/Components/Video/201808/tdy_food_klg_chicken_180828_1920x1080.today-inline-vid-featured-desktop.jpg',
      [new Ingredient('ing', 1), new Ingredient('something', 2)]
    ),
    new Recipe(
      1,
      'A Test Recipe b',
      'this is simply a test b',
      'https://media3.s-nbcnews.com/j/MSNBC/Components/Video/201808/tdy_food_klg_chicken_180828_1920x1080.today-inline-vid-featured-desktop.jpg',
      [new Ingredient('ajo', 45), new Ingredient('banana', 5)]
    )
  ];
  constructor(private http: HttpClient, private authService: AuthService) {}

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next([...this.recipes]);
  }

  getRecipe(recipeId: number) {
    return this.recipes.find(({ id }) => {
      return id === recipeId;
    });
  }

  updateRecipe(recipe: Recipe) {
    let updatedRecipe = this.recipes.find(({ id }) => id === recipe.id);
    if (updatedRecipe) {
      updatedRecipe = recipe;
    } else {
      this.recipes.push(recipe);
    }
    this.recipesChanged.next([...this.recipes]);
  }
  onDeleteRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex(({ id }) => id === recipe.id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
    }
    this.recipesChanged.next([...this.recipes]);
  }

  saveData() {
    const token = this.authService.getToken();
    return this.http.put(
      'https://ng-recipe-book-2dd2b.firebaseio.com/recipes.json?auth=' + token,
      this.getRecipes()
    );
  }
  fetchData() {
    const token = this.authService.getToken();
    return this.http
      .get('https://ng-recipe-book-2dd2b.firebaseio.com/recipes.json?auth=' + token)
      .pipe(
        map(response => {
          if (response === null) {
            response = [];
          }
          const recipes: Recipe[] = response as Recipe[];
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              console.log(recipe);
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((data: Recipe[]) => this.setRecipes(data));
  }
}
