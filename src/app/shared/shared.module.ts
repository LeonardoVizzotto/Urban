import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ToolBarComponent } from './toolbar/toolbar.component';
import { ContainerComponent } from './container/container.component';
import { RatingComponent } from './rating/rating.component';
import { ButtonComponent } from './button/button.component';
import { SpacerComponent } from './spacer/spacer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    CardComponent,
    ToolBarComponent,
    ContainerComponent,
    RatingComponent,
    ButtonComponent,
    SpacerComponent,
    InputComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    CardComponent,
    ToolBarComponent,
    ContainerComponent,
    RatingComponent,
    ButtonComponent,
    SpacerComponent,
    InputComponent,
  ],
})
export class SharedModule {}
