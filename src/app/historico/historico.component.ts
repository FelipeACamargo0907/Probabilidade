import { Component } from '@angular/core';
import { Historico } from '../historico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistoricoService } from '../historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {

  Historico: Historico[] = [];
  formGroupHistorico: FormGroup;

  constructor(private historicoService : HistoricoService,
    private formBuilder : FormBuilder) {
      this.formGroupHistorico = this.formBuilder.group({
        id: [''],
        favoraveis: [''],
        possiveis: [''],
        resultado: ['']
      })
     }

  ngOnInit(): void {
    this.loadHistorico();
  }


  loadHistorico(){
    this.historicoService.getHistorico().subscribe(
      {
        next : data => this.Historico = data
      }
    );
  }
}
