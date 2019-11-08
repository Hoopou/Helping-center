import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { alertMsg } from '../../../../core/models/alert.model';
import { Employe } from '../../../../core/models/employe.model';

@Component({
  selector: 'app-plan-formation',
  templateUrl: './plan-formation.component.html',
  styleUrls: ['./plan-formation.component.scss']
})
export class PlanFormationComponent implements OnInit {
  error: alertMsg[] = [];
  message: alertMsg[] = [];

  employes: Employe = Employe.empty();
  
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) { }
  
  ngOnInit() {
    
  }

}
