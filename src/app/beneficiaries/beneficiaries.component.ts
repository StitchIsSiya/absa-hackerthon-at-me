import { Component, OnInit, Input } from '@angular/core';
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
  _addBeneficiaryJsonUrl = '../../assets/data/users-list.json'
  showAdd = false;
  @Input() handle = "";
  matchNotFound = false;

  beneficiaries: Beneficiary[] = [];
  users: Beneficiary[] = [];

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

  public getUsers(): Observable<any> {
    return this.http
    .get<Beneficiary[]>(
      this._addBeneficiaryJsonUrl
    );
  }

  onAddBeneficiary() {
    this.showAdd = true; 
  }

  onClickOverlay() {
    this.showAdd = false;
    this.handle = "";
  }

  onSubmit() {
    this.getUsers().subscribe(
      data => {
        console.log(this.handle);
        this.matchNotFound = false;
        this.users = data;
        let match = false;
        for(let i = 0; i < this.users.length; i++) {
          if(this.handle === this.users[i].handle) {
            match = true;
            this.addBeneficiary(this.users[i]); 
          }
        }

        if(!match) {
          this.matchNotFound = true;
        }
      },
      error => {
        console.log("Failed");
      }
    );
  }

  addBeneficiary(user: Beneficiary) {
    console.log("Pushing: " + user);
    this.beneficiaries.push(user);
    this.showAdd = false;
    this.handle = "";
  }

  deleteBeneficiary(handle: string) {
    for(let i = 0; i < this.beneficiaries.length; i++) {
      if(handle === this.beneficiaries[i].handle) {
        this.beneficiaries.splice(i);
      }
    }
  }
}
