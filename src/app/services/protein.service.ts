import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { Observable } from 'rxjs'
import { Subject } from 'rxjs'
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ProteinDataService {

  private urlApi:string = "http://localhost:8080"
  private subject = new Subject<any>()
  private proteinSubject = new Subject<any>()

  constructor(private http:Http){
  }

  searchById(proteinaId:string){
    // this.http.get('/api/proteins/get/' + proteinaId)
    // .map((r:any) => r.json())
    // .subscribe(result => {
    //   this.proteinSubject.next(result);
    // })

    this.http.get(this.urlApi+'/api/proteins/get/' + proteinaId).pipe(
      map((r:any) => r.json()),
      //catchError(err => of('error found')),
    )
    .subscribe(result => {
      this.proteinSubject.next(result);
    })
    
  }

  

  getAll() {
    this.http.get(this.urlApi+'/api/proteins/getAll').pipe(
      map((r:any) => r.json())
    )
    .subscribe( result => {
      this.subject.next(result)
    })
  }

  search(textSearch:string){
    this.http.get(this.urlApi+'/api/proteins/search/' + textSearch).pipe(
      map((r:any) => r.json())
    ) 
    .subscribe( result => {
      this.subject.next(result)
    })
  }

  searchByReaction(search:string){
    this.http.get(this.urlApi+'/api/proteins/searchByReaction/' + search).pipe(
      map((r:any) => r.json())
    )
    .subscribe( result => {
      this.subject.next(result)
    })
  }

  searchByOrganism(search:string){
    this.http.get(this.urlApi+'/api/proteins/searchByOrganism/' + search).pipe(
      map((r:any) => r.json())
    )
    .subscribe( result => {
      this.subject.next(result);
    })
  }

  getSearchResult():Observable<any> {
    return this.subject.asObservable()
  }

  getSearchResultById():Observable<any> {
    return this.proteinSubject.asObservable()
  }
}
