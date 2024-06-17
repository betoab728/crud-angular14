import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  listProducts: Product[] =[]
  loading : boolean = true;

  constructor(private __productService: ProductService , private toastr: ToastrService) { 

  }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts(){

    setTimeout(() => {
      this.__productService.getProducts().subscribe((data: Product[] ) => {
        this.listProducts = data ;
        this.loading = false;
      })
    }, 2000);

    this.loading = true;
  }

  deleteProduct(id: number){
    this.loading = true;
    this.__productService.deleteProduct(id).subscribe(() => {
        this.getListProducts();
        this.toastr.warning('El producto fue eliminado con exito', 'Producto Eliminado');

      })
    
  }

}
