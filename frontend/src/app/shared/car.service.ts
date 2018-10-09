import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CarService {

    public API = '//localhost:8083';
    public CAR_API = this.API + '/cars';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get('//localhost:8083/cool-cars');
    }

    get(id: string) {
        return this.http.get(this.CAR_API + '/' + id);
    }

    save(car: any): Observable<any> {
        let result: Observable<Object>;
        if (car['href']) {
            result = this.http.put(car.href, car);
        } else {
            result = this.http.post(this.CAR_API, car);
        }
        return result;
    }

    remove(href: string) {
        return this.http.delete(href);
    }

}
