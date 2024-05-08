import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
	providedIn: 'root'
})
export class RestService {

	// serviceurl = "https://dev.codemeg.com/new-caly-backend/customer/";
	serviceurl = "https://caly.sa/caly-backend/customer/";
	// serviceurl = "http://localhost:8000/customer/";
	httpOptions: any;
	loading: any;
	isLoading = false;
	warning: any;
	constructor(private toastr: ToastrService, public http: HttpClient, private translate: TranslateService, private router: Router) {

	}
	setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	getToken(): string | null {
		return localStorage.getItem('token');
	}

	isLoggedIn() {
		return this.getToken() !== null;
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['login']);
	}

	serverdataget(service: any) {
		var str = '' + service;
		var res = str.charAt(str.length - 1);
		if (res == '?') {
			var lang = "lang=" + localStorage.getItem("DefaultLang");
		}
		else {
			var lang = "&lang=" + localStorage.getItem("DefaultLang");
		}
		return this.http.get(this.serviceurl + service + lang);
	}
	serverdataposttwo(service: any, servicedata: any) {

		let mydata = new FormData();

		if (servicedata.length > 0) {
			let i = 0;
			for (let obj of servicedata) {
				for (let key in obj) {
					mydata.append(key, obj[key]);

				}
				i++;
			}
		}
		mydata.append('lang', '' + localStorage.getItem("DefaultLang"));
		return this.http.post(this.serviceurl + service, mydata);
	}
	Authodatagetservice(service: any, token: any) {
		const httpOptions = {
			headers: new HttpHeaders({ 'Authorization': token })
		};
		return this.http.get(this.serviceurl + service, httpOptions);
	}

	Authodatapostservice(service: any, servicedata: any, token: any) {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

		return this.http.post(this.serviceurl + service, servicedata, { headers: myHeaders });
	}
	AuthodataImagepostservice(service: any, servicedata: any, token: any) {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'Authorization': token });

		return this.http.post(this.serviceurl + service, servicedata, { headers: myHeaders });
	}
	AuthodataPUTservice(service: any, servicedata: any, token: any) {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

		return this.http.put(this.serviceurl + service, servicedata, { headers: myHeaders });
	}

	AuthodataDELETEservice(service: any, servicedata: any, token: any) {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token,
			}),
			body: servicedata
		};
		return this.http.delete(this.serviceurl + service, options);
	}
	translatetsfiledata(data: any, Type: any) {
		this.translate.get(data).subscribe((res: string) => {

			if (Type == 'Success') {
				this.toastr.success(res, Type);
			} else if (Type == 'warning') {
				this.toastr.warning(res, Type);
			} else {
				this.toastr.error(res, Type);
			}
		});
	}



}
