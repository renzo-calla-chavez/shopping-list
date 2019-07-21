import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
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
    // return this.http.put(
    //   'https://ng-recipe-book-2dd2b.firebaseio.com/recipes.json',
    //   this.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //   }
    // );
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-2dd2b.firebaseio.com/recipes.json',
      this.getRecipes(),
      {
        reportProgress: true
      }
    );
    return this.http.request(req);
  }
  fetchData() {
    return this.http
      .get<Recipe[]>('https://ng-recipe-book-2dd2b.firebaseio.com/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          if (recipes === null) {
            recipes = [];
          }
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
