import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { TableViewComponent } from '../table-view/table-view.component';
import { Router } from '@angular/router';
import { constants } from '../../constants/constants';
import { catchError, Subject, takeUntil, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableViewComponent, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private destroy$ = new Subject<void>();
  searchMode: 'free' | 'id' | 'email' = 'free';
  searchText = '';
  rowData: any[] = [];
  popupMessage = '';
  isPopupVisible = false;
  placeHolder : string = constants.placeholderForSearch
  searchByIdOrEmail = false;

  constructor(private apiService: ApiServiceService,
    private router: Router
  ) {}

  onSearch() {
    if (this.searchByIdOrEmail){
      this.onIdOrEmailSearch(); return;
    } 
    this.apiService.clearUsers();
    // if (!this.searchText || this.searchText.length <= 2) {
    //   this.showPopup('Please enter at least 3 characters to search.');
    //   return;
    // }
    this.apiService.getUsers(this.searchText).subscribe(users => {
      this.apiService.setUsers(users);
      this.router.navigate(['/list-users'], { state: { data: users } });
    }, error => {
      this.showPopup('No user found or server error.');
    });
  }

  onIdOrEmailSearch() {
    if (!this.searchText) {
      this.showPopup('Please enter an ID or Email.');
      return;
    }
    this.apiService.getUserByIdOrEmail(this.searchText).subscribe(user => {
      if (user) {
        this.router.navigate(['/details', user.id], { state: { data: user } });
      } else {
        this.showPopup('No user details for current search');
      }
    }, error => {
      this.showPopup('No user details for current search');
    });
  }
  
  showPopup(message: string): void {
    this.popupMessage = message;
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
