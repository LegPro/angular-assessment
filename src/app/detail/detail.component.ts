import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DetailComponent implements OnInit {
  company: any;

  constructor(private router: Router, private dataService: DataService) {
    this.company = this.dataService.getCompanyData();
    if (!this.company) {
      // Redirect to search if no data is available (handle edge cases)
      this.router.navigate(['/search']);
    }
  }

  ngOnInit() {}

  goToOfficers() {
    this.router.navigate(['/officer'], { state: { 
      companyNumber: this.company.company_number, 
      companyName: this.company.title  } });
  }
}
