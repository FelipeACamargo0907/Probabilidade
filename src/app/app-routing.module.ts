import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
{path: 'calculadora', component: CalculadoraComponent},
{path: 'historico', component: HistoricoComponent},
{path: '', redirectTo: '/calculadora', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
