import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  getInfoResult: any;
  getTrailerResult: any;
  getCastResult: any;

  constructor(
    private filmService: FilmService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private myIframe: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    let Id = this.router.snapshot.paramMap.get('id');
    this.getInfo(Id);
    this.getCast(Id);
    this.getTrailer(Id);
  }

  getInfo(id: any) {
    this.filmService.getInfoFilm(id).subscribe((data) => {
      this.getInfoResult = data;
    });
  }

  //   getTrailer(id: any) {
  //     this.filmService.getTrailerFilm(id).subscribe((data) => {
  //       console.log('Risposta dalla chiamata:', data);

  //       // Verifica se la proprietà 'results' è definita e se è un array non vuoto
  //       if (
  //         data.results &&
  //         Array.isArray(data.results) &&
  //         data.results.length > 0
  //       ) {
  //         data.results.forEach((result: any) => {
  //           // Verifica se l'elemento ha la proprietà 'type' e se è 'Trailer'
  //           if (result.type === 'Trailer') {
  //             console.log('Result key:', result.key);

  //             this.getTrailerResult = result.key;
  //           }
  //         });
  //       } else {
  //         console.error(
  //           'La proprietà results in data non è definita o è un array vuoto.'
  //         );
  //       }
  //     });
  //   }

  getTrailer(id: any) {
    this.filmService.getTrailerFilm(id).subscribe((trailerResult) => {
      if (trailerResult) {
        this.getTrailerResult = trailerResult;
      } else {
        console.error('Nessun trailer disponibile.');
      }
    });
  }

  getCast(id: any) {
    this.filmService.getCastFilm(id).subscribe((data) => {
      this.getCastResult = data.cast;
    });
  }

  //   openTrailer(videoKey: string): void {
  //     const url = `https://www.themoviedb.org/video/play?key=${videoKey}`;
  //     window.open(url, '_blank');
  //   }

  getTrailerEmbedUrl(videoKey: string): SafeResourceUrl {
    const url = `https://www.themoviedb.org/video/play?key=${videoKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  adjustIframeHeight(event: any): void {
    console.log('Funzione adjustIframeHeight chiamata con evento:', event);

    if (this.myIframe && this.myIframe.nativeElement) {
      const iframeDocument =
        this.myIframe.nativeElement.contentDocument ||
        (this.myIframe.nativeElement.contentWindow
          ? this.myIframe.nativeElement.contentWindow.document
          : undefined);

      try {
        if (iframeDocument) {
          iframeDocument.body.style.height = '500px';
          console.log("Altezza del body dell'iframe modificata con successo.");
        } else {
          console.error(
            "Impossibile accedere al documento dell'iframe. Contenuto del documento:",
            this.myIframe.nativeElement.contentWindow
          );
        }
      } catch (error) {
        console.error(
          "Errore durante l'accesso al documento dell'iframe:",
          error
        );
      }
    } else {
      console.error(
        "Impossibile accedere all'elemento nativeElement dell'iframe."
      );
    }
  }
}
