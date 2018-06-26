import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$; 
  @Input('category') category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.getAll(); 
  }

  ngOnInit() {
  }

}
