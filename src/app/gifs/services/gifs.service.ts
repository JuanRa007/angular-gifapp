import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  // Angular lo provee para todos los módulos
  providedIn: 'root'
})
export class GifsService {

  // Key ApiKey
  private apiKey: string = '8tKTTC1QgTyRVELQHRBmsUTJNNYcw5b5';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // TODO: cambiar any por su tipo.
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  // Incluimos las peticiones a la API con http.
  constructor(private http: HttpClient) {

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }

  }


  buscarGifs(query: string = '') {

    // Antes de nada, lo paso a minúsculas.
    query = query.trim().toLocaleLowerCase();

    // Antes de insertar compruebo que no exista.
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);

      // Se restringe a 10 resultados.
      this._historial = this._historial.splice(0, 10);


      // Guardamos los resultados en el LocalStore del navegador.
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // HTTP PARAMS:
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('lang', 'es')
      .set('q', query);

    // Url: http://api.giphy.com/v1/gifs/search?api_key=8tKTTC1QgTyRVELQHRBmsUTJNNYcw5b5&q=Sabrina&limit=10&lang=es
    // Propia de Angular
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: params })
      .subscribe((resp) => {
        // console.log(resp.data);
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      });

    // console.log(this._historial);

  }


}
