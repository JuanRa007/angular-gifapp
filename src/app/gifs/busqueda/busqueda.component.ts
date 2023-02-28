import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  // La variable "txtBuscar" no está inicializada y TryScript no le gusta.
  // Sin ese carácter "!" se quejaría, ya que podría ser "null" según TryScript,
  // pero nosotros sabemos que SIEMPRE existirá (está en el html).
  //
  // Al incluirle el tipado "<HTMLInputElement>" mediante el tipado genérico "<>"
  @ViewChild('txtbuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // Vamos a incluir (importar) el servicio de búsquedas.
  constructor(private gifsService: GifsService) { }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }
}
