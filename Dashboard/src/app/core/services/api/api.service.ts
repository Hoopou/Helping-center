import { Injectable } from '@angular/core';
import { LoginService } from './sub-services/login.service';
import { LookupService } from './sub-services/lookup.service';
import { AppConnectionService } from './sub-services/appConnection.service';
import { NotificationService } from './sub-services/notification.service';
import { SettingsService } from './sub-services/settings.service';
import { FormationService } from './sub-services/FormationService';
import { EmployeService } from './sub-services/employeService';
import { PostesService } from './sub-services/postes.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public readonly loginService: LoginService,
    public readonly lookupService: LookupService,
    public readonly connectedAppsService: AppConnectionService,
    public readonly notificationService: NotificationService,
    public readonly settingsService: SettingsService,
    public readonly formationService: FormationService,
    public readonly employeService: EmployeService,
    public readonly posteService: PostesService
    
  ) { }
}
