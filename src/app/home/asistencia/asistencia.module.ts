import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { AsistenciaPageRoutingModule } from './asistencia-routing.module';
import { AsistenciaPage } from './asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Esto asegura que los componentes de Ionic sean reconocidos
    AsistenciaPageRoutingModule
  ],
  declarations: [AsistenciaPage]
})
export class AsistenciaPageModule {}
