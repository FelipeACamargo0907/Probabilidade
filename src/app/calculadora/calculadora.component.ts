import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Historico } from '../historico';
import { HistoricoService } from '../historico.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  favoraveis: number = 0;
  possiveis: number = 0;
  resultadoTemp: number = 0;
  resultado: string = "";

  Historico: Historico[] = [];
  formGroupHistorico: FormGroup;

  constructor(private historicoService: HistoricoService,
    private formBuilder: FormBuilder) {
    this.formGroupHistorico = this.formBuilder.group({
      id: [''],
      tipo: ['Simples'],
      valor1: [''],
      valor2: [''],
      resultado: ['']
    })
  }


  CalcularProbabilidade() {
    if(this.possiveis != 0 && this.favoraveis != 0 && this.possiveis >= this.favoraveis && this.favoraveis != null && this.possiveis != null){
    this.resultadoTemp = (this.favoraveis / this.possiveis) * 100;

    this.resultado = this.resultadoTemp.toFixed(2) + "%"
    }else{
      this.resultado = "\n"+"O valor de favoráveis deve ser menor ou igual que possíveis e não pode ser zero!";
    }
  }

  save() {
    if (this.formGroupHistorico.valid) {
      const resultado = {
        ...this.formGroupHistorico.value,
        resultado: this.resultado
      };
      this.historicoService.save(resultado).subscribe(
        {
          next: data => {
            this.Historico.push(data)
            this.formGroupHistorico.reset();
          }
        }
      );
    }
  }


}
