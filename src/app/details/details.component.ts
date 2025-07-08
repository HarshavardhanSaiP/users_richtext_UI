import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const rawUser = history.state.data;
    if (rawUser) {
      this.user = rawUser;
      console.log('User for details:', this.user);
    }
  }

  goBack() {
    const cachedUsers = this.apiService.getCachedUsers();
    if (cachedUsers && cachedUsers.length > 1) {
      // Came from free text search, show full list
      this.router.navigate(['/list-users']);
    } else {
      // Came from ID/Email search, show just this user
      this.router.navigate(['/list-users'], { state: { data: [this.user] } });
    }
  }
}
