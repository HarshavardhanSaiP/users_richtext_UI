import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: string | null = null;
  recipe! : any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.recipe = history.state.data;    
  }

}
