import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-test-script-menu',
  templateUrl: './test-script-menu.component.html',
  styleUrls: ['./test-script-menu.component.scss']
})
export class TestScriptMenuComponent implements OnInit {
  listPgs: any = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    $(document).on('click', 'nav ul > li > a', function () {
      $(this).parent('li').toggleClass('active');
      $(this).next('ul').slideToggle('30');
    });

    this.http.get('http://ec2-18-222-64-182.us-east-2.compute.amazonaws.com:8081/rest/api/pages/locators')
      .subscribe(
        response => {
          this.listPgs = JSON.stringify(response);
          console.log(this.listPgs);
        }
      );
  }

}
