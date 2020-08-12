import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary } from './model/beneficiary.model';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  _beneficiaryJsonURL = '../../assets/data/beneficiaries.json';

  beneficiaries: Beneficiary[] = [];

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(
      data => {
        this.beneficiaries = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

  public getJSON(): Observable<any> {
    return this.http
    .get<Beneficiary[]>(
      this._beneficiaryJsonURL
    );
  }

  onAddBeneficiary() {
    
  }

}
