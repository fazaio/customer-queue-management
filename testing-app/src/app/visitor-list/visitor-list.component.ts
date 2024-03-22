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
  dataSource: VisitorInterface[] = [];

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

  applyFilter(value: any) {
    console.log(this.dataSource);
    if(value.length > 0){
      const filteredArray = this.dataSource.filter(item => {
        // Convert the full_name to lowercase and check if it includes the search string
        return item.full_name.toLowerCase().includes(value.toLowerCase());
      });
      this.dataSource = filteredArray
    }else{
      this.fetchData()
    }
  }

  displayedColumns: string[] = ['full_name', 'address', 'phone_number', 'queue_number'];
}


export interface VisitorInterface {
  full_name: string;
  address: string;
  phone_number: string;
  queue_number: string;
}