import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: UsuarioService,
    private toast: ToastrService,
    private router: Router
  ){}
  
  usuarios!: Observable<any>;

  ngOnInit(){
    this.findAll();
  }

  findAll(){
    this.usuarios = this.service.findAll();
  }

  delete(key: string){
    this.service.delete(key);
    this.toast.error('Usuário excluído com sucesso!');
  }

  edit(usuario: Usuario, key: string){
    this.router.navigate(['usuarios/create', usuario])
  }

}