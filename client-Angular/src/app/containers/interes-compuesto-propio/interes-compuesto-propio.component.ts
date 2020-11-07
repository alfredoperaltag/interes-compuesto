import { Component, OnInit } from '@angular/core';

import { InteresCompuestoPropioService } from '../../services/interesCompuestoPropio/interes-compuesto-propio.service'
import { NgForm } from '@angular/forms'

import Chart from 'chart.js'

@Component({
  selector: 'app-interes-compuesto-propio',
  templateUrl: './interes-compuesto-propio.component.html',
  styleUrls: ['./interes-compuesto-propio.component.css']
})
export class InteresCompuestoPropioComponent implements OnInit {

  myChart = Chart
  data: any = null

  meses = []
  ingresosExtrasMensuales = []
  interesesCompuestos = []

  constructor(public interesCompuestoPropioService: InteresCompuestoPropioService) { }

  async ngOnInit(): Promise<void> {
    await this.getInteresCompuestoPropio()

    const canvas = <HTMLCanvasElement>document.getElementById('myChart2')
    const ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: "line",
      data: {
        //Bring in data
        labels: this.meses,
        datasets: [
          {
            label: "Interes Compuesto",
            data: this.interesesCompuestos,
            borderColor: 'green',
            backgroundColor: 'rgba(255,255,255,0)',
            borderWidth: 2,
            lineTension: 0
          },
          {
            label: "Ingreso Extra Mensual",
            data: this.ingresosExtrasMensuales,
            borderColor: 'blue',
            backgroundColor: 'rgba(255,255,255,0)',
            borderWidth: 2,
            lineTension: 0
          }/*,
          {
            label: "Dinero inicial",
            data: this.interesesCompuestos,
            borderColor: 'black',
            backgroundColor: 'rgba(255,255,255,0)',
            borderWidth: 2
          }*/
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

  getInteresCompuestoPropio() {
    this.meses = []
    this.ingresosExtrasMensuales = []
    this.interesesCompuestos = []
    this.interesCompuestoPropioService.getInteresCompuestoPropio().subscribe(res => {
      res.forEach(element => {

        this.meses.push(element.meses)
        this.ingresosExtrasMensuales.push(element.ingresosExtrasMensuales)
        this.interesesCompuestos.push(element.interesesCompuestos)
      });

      this.myChart.data.labels = this.meses
      this.myChart.data.datasets[0].data = this.interesesCompuestos
      this.myChart.data.datasets[1].data = this.ingresosExtrasMensuales
      this.myChart.update()

      this.interesCompuestoPropioService.interesCompuestoPropios = res
    })
  }

  submit(form: NgForm) {
    this.interesCompuestoPropioService.postInteresCompuestoPropio(form.value).subscribe(res => {
      this.getInteresCompuestoPropio()
    })
  }

  deleteInteresCompuestoPropio(_id: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.interesCompuestoPropioService.deleteInteresCompuestoPropio(_id).subscribe(res => {
        this.getInteresCompuestoPropio()
      })
    }
  }

}
