import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: UsuarioService
  ){}

  ELEMENT_DATA: Usuario[] = []

  usuarioTeste: Usuario ={
    id: 1,
    nome: 'Buno',
    cpf: '45111889809',
    email: 'bruno@gmail.com',
    senha: '123'
  }

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);

  ngOnInit(){
    this.findAll();
  }

  findAll(){
      this.ELEMENT_DATA.push(this.usuarioTeste);
      this.dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}