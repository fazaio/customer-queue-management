import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {

  constructor(private elementRef: ElementRef, private http: HttpClient, private router: Router) { }
  dataSource: any = {};

  ngOnInit(): void {
    this.fetchData()    
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/visitor/queue') // Replace URL with your backend API endpoint
      .subscribe(data => {
        this.dataSource = data; // Assign fetched data to dataSource array
        console.log(data);
      });
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0e0e0';
  }

  barcodeData: string = '123456789'; // Barcode data
  barcodeType: string = 'code128'; // Barcode type
  barcodeFormat: string = 'CODE128'; // Barcode format
  barcodeWidth: number = 2; // Barcode width
  barcodeHeight: number = 100; // Barcode height
}
