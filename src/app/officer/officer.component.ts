import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class OfficerComponent implements OnInit {
  officers: any[] = [];
  companyNumber: string | null = null;
  companyName: string | null = null;
  
  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { companyNumber: string, companyName: string };
    if (state) {
      this.companyNumber = state.companyNumber;
      this.companyName = state.companyName;
    }
  }

  ngOnInit() {
    if (this.companyNumber) {
      this.fetchOfficers();
    }
  }

  fetchOfficers() {
    const url = `/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber=${this.companyNumber}`;
    this.http.get<any>(url).subscribe((response) => {
      this.officers = response.items || [];
    });
  }
}
