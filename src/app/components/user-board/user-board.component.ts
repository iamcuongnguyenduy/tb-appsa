import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-board',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export default class UserBoardComponent implements OnInit {
  delete: any;
  
    constructor(private userService: UserService){}
  
    ngOnInit(): void {
      this.getUsers()    
    }
    
    users: User[]=[];
    getUsers(){
      this.userService.getUsers()
        .subscribe(res => {
          this.users = res;
        })
    } 

}
