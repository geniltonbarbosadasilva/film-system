import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
	selector: 'dio-visualisar-filme',
	templateUrl: './visualisar-filme.component.html',
	styleUrls: ['./visualisar-filme.component.scss']
})
export class VisualisarFilmeComponent implements OnInit {
	readonly semFoto = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image";
	filme: Filme;
	id: number;

	constructor(
		public dialog: MatDialog,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private filmesService: FilmesService
	) { }

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params["id"];
		this.visualizar();
	}

	excluir(): void {
		const config = {
			data: {
				titulo: "Voce tem certza",
				descricao: "Se sim, clique em confirmar",
				corBtnCancelar: "primary",
				corBtnSucesso: "warn",
				possuirBtnFechar: true
			} as Alerta
		};
		const dialogRef = this.dialog.open(AlertaComponent, config);
		dialogRef.afterClosed().subscribe((opcao) => {
			if (opcao) {
				this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl("/filmes"));
			}
		});

	}

	private visualizar(): void {
		this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
	}



}
