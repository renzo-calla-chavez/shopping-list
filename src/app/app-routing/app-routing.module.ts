import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import {HomeComponent} from '../core/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {path: 'recipes', loadChildren: '../recipe/recipes.module#RecipesModule'} ,
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
