import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  heroCheck,
  heroPlus,
  heroFunnel,
  heroFolder,
  heroEllipsisHorizontal,
  heroTrash,
  heroInbox,
  heroStar,
  heroCalendarDays,
} from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    NgIconsModule.withIcons({
      heroCheck,
      heroPlus,
      heroFunnel,
      heroFolder,
      heroEllipsisHorizontal,
      heroTrash,
      heroInbox,
      heroStar,
      heroCalendarDays,
    }),
  ],
  exports: [
    MatIconModule,
    CommonModule,

    NgIconsModule, // Esto permite que CommonModule esté disponible para otros módulos que importen SharedModule
  ],
})
export class SharedModule {}
