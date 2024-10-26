// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private companyData: any = null;

  setCompanyData(data: any) {
    this.companyData = data;
  }

  getCompanyData() {
    return this.companyData;
  }
}
