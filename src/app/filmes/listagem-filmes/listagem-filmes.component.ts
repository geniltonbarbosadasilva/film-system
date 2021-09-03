import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
    selector: 'dio-listagem-filmes',
    templateUrl: './listagem-filmes.component.html',
    styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
    readonly semFoto = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image";

    config: ConfigParams = {
        pagina: 0,
        limite: 4
    }
    filmes: Filme[] = [];
    filtros: FormGroup;
    
    generos: string[];


    constructor(
        private filmesService: FilmesService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {      
        this.filtros = this.formBuilder.group({
            texto: [''],
            genero: ['']
        });

        this.filtros.get("texto").valueChanges
            .pipe(debounceTime(500))
            .subscribe((valor: string)=>{
            this.config.pesquisa = valor;
            this.resetarListagem();
        });

        this.filtros.get("genero").valueChanges.subscribe((valor: string)=>{
            this.config.campo = { tipo: "genero", valor: valor };
            this.resetarListagem();
        });

        this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

        this.listarFilmes();        
    }

    onScroll(): void {
        this.listarFilmes();
    }

    private listarFilmes(): void {
        // this.pagina = (this.pagina > 4)? 1: this.pagina+1;
        this.config.pagina++;
        this.filmesService
            .listar(this.config)
            .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
    }

    private resetarListagem(): void {
		this.config.pagina = 0;
        this.filmes = [];
        this.listarFilmes();
	}
}
