import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.Service';
import { Observable } from 'rxjs';

@Component( {
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.css' ]
} )
export class UserProfileComponent implements OnInit
{
  loggedInUser: any | null = null; // Armazena o usuário logado, inicializado como nulo
  markedAnimes$: Observable<any[]> | null = null; // Usando o operador async para aguardar a resolução do Observable

  constructor ( private userService: UserService ) { }

  ngOnInit (): void
  {
    this.userService.getLoggedInUser().subscribe( ( user ) =>
    {
      this.loggedInUser = user;
      // Após obter o usuário logado, carregue os animes marcados por esse usuário
      if ( user )
      {
        this.markedAnimes$ = this.userService.getMarkedAnimes();
      } else
      {
        this.markedAnimes$ = null; // Defina como nulo se o usuário não estiver autenticado
      }
    } );
  }
}
