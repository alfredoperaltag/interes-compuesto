import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { InteresCompuesto } from '../models/interes-compuesto';
import { InteresCompuestoRes } from '../models/interes-compuesto-res';

@Injectable({
  providedIn: 'root'
})
export class InteresCompuestoService {

  interesCompuesto: InteresCompuesto = {
    calendario: "2022-07-10",
    dineroInicial: 0,
    porcentaje: 5.369,
    ingresoExtraMensual: 2854.18,
    cantidadConsultar: 50
  }

  interesCompuestoRes: InteresCompuestoRes = {
    meses: [],
    dinerosIniciales: [],
    ingresosExtrasMensuales: [],
    interesesCompuestos: [],
    labelCantidadConsultada: "",
    labelGenerarCentavo: "",
    cantidadConsultar: ""
  }

  readonly URL_API = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  postInteresCompuesto(interesCompuesto: InteresCompuesto) {
    return this.http.post(this.URL_API, interesCompuesto)
  }
}
