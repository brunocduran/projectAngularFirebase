import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent {

  constructor(
    private service: UsuarioService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  key: string = '';

  usuario: Usuario = {
    nome: '',
    cpf: '',
    email: '',
    senha: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario = {
        nome: params['nome'],
        cpf: params['cpf'],
        email: params['email'],
        senha: params['senha']
      };

      this.key = params['key'];
    })

  }

  create(): void {
    console.log(this.key);
    console.log(this.usuario);

    if (this.key) {
      this.service.update(this.usuario, this.key);
      this.toast.success('Usuário alterado com sucesso');
      this.router.navigate(['usuarios'])

    } else {
      this.service.insert(this.usuario);
      this.toast.success('Usuário cadastrado com sucesso');
      this.router.navigate(['usuarios'])
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

}
