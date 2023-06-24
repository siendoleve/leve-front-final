import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public role!: string;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getInfo().subscribe({
      next: (resp) => {
        this.role = resp.user.role;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
