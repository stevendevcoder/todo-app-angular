import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { Proyect } from './models/Proyect';
import { ProyectComponent } from './components/proyect/proyect.component';
import { ProyectsService } from './services/proyects.service';
import { firstValueFrom } from 'rxjs';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { AddProyectComponent } from "./components/proyect/add-proyect/add-proyect.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    ProyectComponent,
    NgxUiLoaderModule,
    AddProyectComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  idSelectedProyect: number = 1;
  proyect: Proyect | undefined;
  proyects: Proyect[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  viewMode: string = 'none';
  proyectToEdit: Proyect | undefined;

  constructor(
    private proyectsService: ProyectsService,
    private ngxService: NgxUiLoaderService
  ) {}

  async ngOnInit() {
    this.ngxService.start();
    try {
      this.proyects = await firstValueFrom(this.proyectsService.getProyects());
      /*
      this.proyectsService.getProyects().subscribe(data => {
        this.proyects = await firstValueFrom(this.proyectsService.getProyects());
      });*/

      this.proyect = this.findProyect(); // asegura que proyect esté definido
      console.log('Cargamos proyectos...: ', this.proyects);
    } catch (error) {
      this.errorMessage = 'Error loading proyects';
    } finally {
      this.isLoading = false;
      this.ngxService.stop();
    }
    console.log(this.idSelectedProyect);
  }

  addProyect(): void {

    this.changeViewMode('add');
  }

  submitNewProyect = (newProyect: Proyect): void => {
    this.proyectsService.addProyect(newProyect).subscribe(
      (response) => {
        // Añadir el proyecto devuelto por el servidor (con el ID generado) a la lista local.
        this.proyects.push(response);
        console.log('Respuesta exitosa: ', response);

        // Cambiar la vista si es necesario.
        this.changeViewMode('none');
      },
      (error) => {
        console.error('Error al enviar el proyecto: ', error);
      }
    );

    this.changeViewMode('none');
  }

  changeViewMode = (type: string): void => {
    this.viewMode = type;
  };

  changeProyect(id: number): void {
    this.idSelectedProyect = id;
    this.proyect = this.findProyect(); // actualiza proyect cuando cambia el id seleccionado
  }

  findProyect = (): Proyect =>
    this.proyects.find((p) => p.idProyect == this.idSelectedProyect) ||
    this.proyects[0];
}
