import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {
    key: '',
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };
  id;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) { 
    this.categories$ = categoryService.getAll();  
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.get(this.id).subscribe((p:any) => this.product=p);
    }
  }

  ngOnInit() {
  }

  save(product){ 
    
    if(this.id){
      this.productService.update(this.id, product);
    }else{
      let result = this.productService.create(product);
    }
 
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure to delete this product?')) return;
     
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
     
  }

  // filter(query: string){
  //   console.log(query);
  // }



}