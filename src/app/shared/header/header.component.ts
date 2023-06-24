import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public name!: string;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getInfo().subscribe({
      next: (resp) => {
        this.name = resp.user.name;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
