import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {

  constructor(private elementRef: ElementRef, private http: HttpClient, private router: Router) { }
  dataSource: PeriodicElement[] = [];

  ngOnInit(): void {
    this.fetchData()
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0e0e0';
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/visitor/all') // Replace URL with your backend API endpoint
      .subscribe(data => {
        this.dataSource = data; // Assign fetched data to dataSource array
        console.log(data);
      });
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  displayedColumns: string[] = ['full_name', 'address', 'phone_number', 'queue_number'];
  // dataSource = ELEMENT_DATA;

}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

export interface PeriodicElement {
  full_name: string;
  address: string;
  phone_number: string;
  queue_number: string;
}