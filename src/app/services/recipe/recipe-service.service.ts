import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  private baseUrl = 'http://localhost:9999';
  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/recipe`, { headers }).pipe(
      tap((recipes: any) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post(`${this.baseUrl}/api/recipe`, recipe, { headers })
      .pipe(
        tap((newRecipe: any) => {
          const currentState = this.recipeSubject.value;
          this.recipeSubject.next({
            ...currentState,
            recipes: [newRecipe, ...currentState.recipes],
          });
        })
      );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/recipe/${recipe.id}`, recipe, { headers })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.receipes.map((item: any) =>
            item.id === updatedRecipe.id ? updatedRecipe : item
          );
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

  deleteRecipe(recipeId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/api/recipe/${recipeId}`, { headers })
      .pipe(
        tap((deletedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.receipes.filter(
            (item: any) => item.id !== recipeId
          );
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

  likeRecipe(recipeId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/recipe/${recipeId}/like`,{ headers })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.receipes.map((item: any) =>
            item.id === updatedRecipe.id ? updatedRecipe : item
          );
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

}
