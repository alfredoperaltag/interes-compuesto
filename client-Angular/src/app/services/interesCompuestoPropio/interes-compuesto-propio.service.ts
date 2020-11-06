import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InteresCompuestoPropio } from '../../models/interesCompuestoPropio/interes-compuesto-propio'

@Injectable({
  providedIn: 'root'
})
export class InteresCompuestoPropioService {
  selectedInteresCompuestoPropio: InteresCompuestoPropio = {
    meses: "",
    ingresosExtrasMensuales: 0,
    interesesCompuestos: 0,
  }
  interesCompuestoPropios: InteresCompuestoPropio[]
  readonly URL_API = "http://localhost:3000/api/interesCompuestoPropio"

  constructor(private http: HttpClient) { }

  getInteresCompuestoPropio() {
    return this.http.get<InteresCompuestoPropio[]>(this.URL_API)
  }

  postInteresCompuestoPropio(interesCompuestoPropio: InteresCompuestoPropio) {
    return this.http.post(this.URL_API, interesCompuestoPropio)
  }
}
