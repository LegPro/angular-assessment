import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class SearchComponent implements OnInit {
  @ViewChild('loginModal') loginModal!: ElementRef;
  
  username = '';
  password = '';
  errorMessage = '';
  results: any[] = [];
  paginatedResults: any[] = [];
  currentPage = 1;
  itemsPerPage = 3;
  itemsPerPageOptions = [3, 5, 10];
  totalPages = 0;
  pagesArray: number[] = [];
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedCompany: any = null;  // Property to store the selected company's data

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { results: any[] };
    if (state && state.results) {
      this.results = state.results;
    }
  }

  
  ngOnInit() {
    this.calculatePagination();
    this.updatePaginatedResults();
  }
  
  openModal(company: any) {
    this.selectedCompany = company;  // Set selected company data
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.results.length / this.itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePaginatedResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedResults = this.results.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedResults();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedResults();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedResults();
    }
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.results.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.updatePaginatedResults();
  }

  updateItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
    this.calculatePagination();
    this.updatePaginatedResults();
  }

  openLoginModal(company: any) {
    this.selectedCompany = company;
    const modal = new bootstrap.Modal(this.loginModal.nativeElement);
    modal.show();
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.authService.login();
      this.dataService.setCompanyData(this.selectedCompany); // Store the selected company data
      const modal = bootstrap.Modal.getInstance(this.loginModal.nativeElement);
      modal.hide(); // Close the modal
      this.router.navigate(['/detail']); // Redirect to detail page
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
