import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms'
import { InteresCompuestoService } from '../services/interes-compuesto.service'
import { InteresCompuestoRes } from '../models/interes-compuesto-res'

import Chart from 'chart.js'

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css']
})
export class ChartFormComponent implements OnInit {

  myChart = Chart

  constructor(public interesCompuestoService: InteresCompuestoService) { }

  ngOnInit(): void {

    const canvas = <HTMLCanvasElement>document.getElementById('myChart')
    const ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: "line",
      data: {
        //Bring in data
        labels: this.interesCompuestoService.interesCompuestoRes.meses,
        datasets: [
          {
            label: "Interes Compuesto",
            data: this.interesCompuestoService.interesCompuestoRes.interesesCompuestos,
            borderColor: 'green',
            backgroundColor: 'rgba(255,255,255,0)',
            borderWidth: 2,
          },
          {
            label: "Ingreso Extra Mensual",
            data: this.interesCompuestoService.interesCompuestoRes.ingresosExtrasMensuales,
            borderColor: 'blue',
            backgroundColor: 'rgba(255,255,255,0)',
            borderWidth: 2
          },
          {
            label: "Dinero inicial",
            data: this.interesCompuestoService.interesCompuestoRes.dinerosIniciales,
            borderColor: 'black',
            backgroundColor: 'rgba(255,255,255,0)',
            borderWidth: 2
          }
        ]
      },
      options: {
          /* scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }, */ tooltips: {
          mode: 'x'
        }
      }
    });
  }

  submit(form: NgForm) {
    this.interesCompuestoService.postInteresCompuesto(form.value).subscribe(res => {
      this.interesCompuestoService.interesCompuestoRes = res as InteresCompuestoRes
      this.myChart.data.labels = this.interesCompuestoService.interesCompuestoRes.meses
      this.myChart.data.datasets[0].data = this.interesCompuestoService.interesCompuestoRes.interesesCompuestos
      this.myChart.data.datasets[1].data = this.interesCompuestoService.interesCompuestoRes.ingresosExtrasMensuales
      this.myChart.data.datasets[2].data = this.interesCompuestoService.interesCompuestoRes.dinerosIniciales
      this.myChart.update()
    })
  }

}
