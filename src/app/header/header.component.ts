import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private recipeService: RecipeService, private authService: AuthService) {}
  onSaveData() {
    this.recipeService
      .saveData()
      .subscribe((data: Response) => console.log(data));
  }

  onFetchData() {
    this.recipeService.fetchData();
  }

  onLogout() {
    this.authService.logout();
  }
}
