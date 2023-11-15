import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  

  constructor(
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit() {
    this.router.navigate(['usuarios/create'])
  }

  logout() {
    this.toast.info('Logout realizado com sucesso', 'Logout');
  }

}
