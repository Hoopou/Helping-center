import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
import { LookupFieldDto } from '../../../models/lookupFieldDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  // crée une fonction qui est bound au this local et non a celui de l'appeleur
  getAccount: Function = this.getAccountDef.bind(this);
  getCieTradeLocation: Function = this.getCieTradeLocationDef.bind(this);
  getGrade: Function = this.getGradeDef.bind(this);
  
  constructor(private http: HttpClient) {}

  getAccountDef(term: string, args: any[] = null): Observable<LookupFieldDto> {
    return this.http.get<LookupFieldDto>(env.API_URL + 'lookup/account', {
      params: this.makeArgString(term, args)
    });
  }

  getCieTradeLocationDef(
    term: string,
    args: any[] = null
  ): Observable<LookupFieldDto> {
    return this.http.get<LookupFieldDto>(
      env.API_URL + 'lookup/cietradelocation',
      { params: this.makeArgString(term, args) }
    );
  }

  getGradeDef(term: string, args: any[] = null): Observable<LookupFieldDto> {
    return this.http.get<LookupFieldDto>(env.API_URL + 'lookup/grade', {
      params: this.makeArgString(term, args)
    });
  }

  /// args should be this format [{key:"value"},{key:"value"}]
  private makeArgString(term: string, args: any[]): HttpParams {
    let params = new HttpParams();

    params = params.set('term', term || '');
    if (args) {
      args.forEach(arg => {
        for (const key in arg) {
          if (arg[key]) {
            params = params.set(key, arg[key]);
          }
        }
      });
    }

    return params;
  }
}
