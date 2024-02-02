import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeServiceService } from '../../services/recipe/recipe-service.service';

@Component({
  selector: 'app-receipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './receipe-card.component.html',
  styleUrl: './receipe-card.component.scss',
})
export class ReceipeCardComponent {
  @Input() recipe: any;
  @Input() toogle: any;

  constructor(
    public dialog: MatDialog,
    private recipeService: RecipeServiceService
  ) {}

  handleEditRecipeForm() {
    this.dialog.open(UpdateRecipeFormComponent, { data: this.recipe });
  }

  ngOnInit() {
    console.log('toggle', this.toogle);
  }

  handleDeleteRecipe() {
    console.log('recipe :: ', this.recipe);
    this.recipeService.deleteRecipe(this.recipe.receipeId).subscribe();
  }
}
