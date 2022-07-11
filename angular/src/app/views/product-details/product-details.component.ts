import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      var id = params.get('id');

      console.log(id);

    });
  }

}
