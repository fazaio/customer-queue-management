import { HttpClient } from '@angular/common/http';
import { Component, ElementRef,OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css'],
})
export class InputVisitorDetailsComponent implements OnInit {
  formData: any = {};
  constructor(private elementRef: ElementRef, private http: HttpClient,  private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0e0e0';
  }

  submitForm(){
    console.log(this.formData);

    this.http.post<any>('http://localhost:3000/visitor/create', this.formData)
      .subscribe(
        response => {
          console.log('Data successfully submitted:', response);
          // Clear form fields after successful submission
          this.router.navigate(['/request-queue-number']);
          this.formData = {};
        },
        error => {
          console.error('Error submitting data:', error);
        }
      );
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

}
