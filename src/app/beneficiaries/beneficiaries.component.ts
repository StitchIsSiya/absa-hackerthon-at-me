import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary } from './model/beneficiary.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  _beneficiaryJsonURL = '../../assets/data/beneficiaries.json';
  showAdd = false;

  beneficiaries: Beneficiary[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
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
    this.showAdd = true; 
  }

  onClickOverlay() {
    this.showAdd = false;
  }

}
