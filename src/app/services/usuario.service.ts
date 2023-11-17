import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Usuario } from '../model/usuario';
import { BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFireDatabase) {}

  insert(usuario: Usuario){
    this.db.list('usuario').push(usuario)
    .then((result: any) => {
      console.log(result.key)
    })
  }

  update(usuario: Usuario, key: string){
    this.db.list('usuario').update(key, usuario)
    .catch((error: any) => {
      console.error(error)
    })
  }

  findAll(){
    return this.db.list('usuario')
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => this.mapToUsuario(c))));
  }

  private mapToUsuario(c: any): Usuario {
    return { key: c.payload.key, ...c.payload.val() } as Usuario;
  }

  delete(key: string){
    this.db.object(`usuario/${key}`).remove();
  }

  /*login(){
    return this.db.list('usuario', ref => ref.orderByChild('email').equalTo('bruno@gmail.com'))
    .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => this.mapToUsuario(c))));
  }*/
  
}
