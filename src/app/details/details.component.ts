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
    this.user = history.state.data;    
  }

  goBack() {
    this.router.navigate(['/list-users']);
  }
}
