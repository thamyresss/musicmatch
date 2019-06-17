import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genero-lista',
  templateUrl: './genero-lista.component.html',
  styleUrls: ['./genero-lista.component.css']
})
export class GeneroListaComponent implements OnInit {
  generos = null;

  /** Uma variável de controle sobre o resultado da exclusão de artista */
  resultadoExcluir = null;

  constructor(private generos$: GenerosService, private router: Router) {

   }

  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista() {
    this.generos$.lista()
      .subscribe(
        lista => this.generos = lista.results
      );
  }

  excluir(genero) {
    if (confirm(`Tem certeza que deseja excluir o artista "${genero.nome}" ?\nEssa ação não é reversível!`)) {
      this.generos$.excluir(genero.id)
        .subscribe(
          _ => {
            this.resultadoExcluir = true;
            this.atualizarLista();
          },
          err => {
            this.resultadoExcluir = err.error;
          }
        )
    }
  }

  editar(genero) {
    this.router.navigate(['generos', genero.id, 'editar']);
  }

  consultar(genero) {
    this.router.navigate(['generos', genero.id]);
  }

}
