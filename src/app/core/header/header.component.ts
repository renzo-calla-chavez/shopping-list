import { Component } from '@angular/core';
import { RecipeService } from '../../recipe/recipe.service';
import { AuthService } from '../../auth/auth.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private recipeService: RecipeService,
    public authService: AuthService
  ) {}
  onSaveData() {
    this.recipeService
      .saveData()
      // .subscribe((data: HttpEvent<object>) => {
      //   console.log(data.type === HttpEventType.Sent);
      // });

  .subscribe((data) => {
    });
  }

  onFetchData() {
    this.recipeService.fetchData();
  }

  onLogout() {
    this.authService.logout();
  }
}
