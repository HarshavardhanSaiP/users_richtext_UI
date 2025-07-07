import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: string | null = null;
  user! : any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const rawUser = history.state.data;
    if (rawUser) {
      this.user = rawUser;
      console.log('User for details:', this.user);
    }
  }

  goBack() {
    this.router.navigate(['/list-users']);
  }
}
