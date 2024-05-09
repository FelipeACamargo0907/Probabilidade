import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Historico } from '../historico';
import { HistoricoService } from '../historico.service';

@Component({
  selector: 'app-condicional',
  templateUrl: './condicional.component.html',
  styleUrls: ['./condicional.component.css']
})
export class CondicionalComponent {
  numerador: any;
  denominador: any;
  resultadoFracaoTemp: any;
  resultadoFracao: any;
  tipo: any ="Condicional";

  pr_ab: any; // Pr(A∩B)
  pr_b: any; // Pr(B)
  resultadoTemp: any;
  resultado: any;

  Historico: Historico[] = [];
  formGroupHistorico: FormGroup;

  constructor(private historicoService: HistoricoService,
    private formBuilder: FormBuilder) {
    this.formGroupHistorico = this.formBuilder.group({
      numerador: [''],
      denominador : [''],
      valor1: [''],
      valor2: [''],
      resultado : ['']
    })
  }


  calcularFracao() {
    if (this.denominador != 0 && this.numerador != 0 && this.denominador >= this.numerador && this.numerador != null && this.denominador != null) {
      this.resultadoFracaoTemp = (this.numerador / this.denominador);
      this.resultadoFracao = this.resultadoFracaoTemp.toFixed(2).toString();
    }else{
      this.resultadoFracao = "\n"+"O numerador deve ser menor ou igual que o denominador e não pode ser zero!";
    }
  }

  calcularProbabilidade() {
    if (this.pr_ab != 0 && this.pr_b != 0 && this.pr_ab <= this.pr_b && this.pr_ab != null && this.pr_b != null) {
      this.resultadoTemp = (this.pr_ab / this.pr_b) * 100;
      this.resultado = this.resultadoTemp.toFixed(2).toString()+"%";
    }else{
      this.resultado = "\n"+"O valor de Pr(A∩B) deve ser menor ou igual que Pr(B) e não pode ser zero!";
    }
  }



  copyText() {
    const texto = this.resultadoFracao;
    const tempInputElement = document.createElement('textarea');
    tempInputElement.value = texto;

    document.body.appendChild(tempInputElement);

    tempInputElement.select();
  
    navigator.clipboard.writeText(texto)
      .then(() => {
      console.log('Texto copiado com sucesso!');
      })
      .catch((error) => {
      console.error('Erro ao copiar o texto: ', error);
      });
  
    document.body.removeChild(tempInputElement);
  }

  save() {
    if (this.formGroupHistorico.valid) {
      
        const resultado = {
          id: 0,
          tipo: this.tipo,
          valor1: this.pr_ab,
          valor2: this.pr_b,
          resultado: this.resultado
        };
        
        this.historicoService.save(resultado).subscribe({
          next: data => {
            this.Historico.push(data);
            this.formGroupHistorico.reset();
          }
        });
    }
  }

  }

