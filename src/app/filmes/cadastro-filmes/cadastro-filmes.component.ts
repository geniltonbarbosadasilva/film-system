import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
    selector: 'dio-cadastro-filmes',
    templateUrl: './cadastro-filmes.component.html',
    styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

    cadastro: FormGroup;
    generos: Array<string>;

    constructor(
        private fb: FormBuilder,
        public validacao: ValidarCamposService
    ) { }

    get inputs(){
        return this.cadastro.controls;
    }

    ngOnInit(): void {

        this.cadastro = this.fb.group({
            titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
            urlFoto: ['', [Validators.minLength(10)]],
            dtLancamento: ['', [Validators.required]],
            descricao: [''],
            nota: [ 0, [Validators.required, Validators.min(0), Validators.max(10)]],
            urlIMD: ['', [Validators.minLength(10)]],
            genero: ['', [Validators.required]]
        });

        this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];
    }

    salvar(): void {
        this.cadastro.markAllAsTouched();
        if(this.cadastro.invalid){
            alert("Invalido!");
            return;
        }

        alert(" ** Sucesso! ** \n\n" + JSON.stringify(this.cadastro.value, null, 4));
    }

    reiniciarForm(): void {
        this.cadastro.reset();
    }
}
