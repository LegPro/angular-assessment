import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, CommonModule],
})
export class HomeComponent {
  searchTerm: string = '';
  showErrorMessage = false;
  invalidInputMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  search() {
    if (!this.searchTerm) {
      this.showErrorMessage = true;
      this.invalidInputMessage =
        'Please enter a company name or number to search.';
    } else if (!this.isAlphabetOrNumeric(this.searchTerm)) {
      this.showErrorMessage = true;
      this.invalidInputMessage =
        'Input must be either all letters or all numbers, without any special characters.';
    } else {
      this.showErrorMessage = false;
      this.invalidInputMessage = '';
      if (!this.searchTerm) {
        this.showErrorMessage = true;
      } else {
        this.showErrorMessage = false;
        const searchUrl = `/TruProxyAPI/rest/Companies/v1/Search?Query=${this.searchTerm}`;

        // Make API call without headers since they are set in proxy.conf.json
        this.http.get(searchUrl).subscribe(
          (response: any) => {
            const results = response.items;

            // Navigate to search page with results as state
            this.router.navigate(['/search'], { state: { results } });
          },
          (error) => {
            console.error('API error:', error);
          }
        );
      }
    }
  }

  isAlphabetOrNumeric(value: string): boolean {
    const isAlpha = /^[A-Za-z]+$/.test(value); // Only alphabets
    const isNumeric = /^[0-9]+$/.test(value); // Only numbers
    return isAlpha || isNumeric;
  }
}
