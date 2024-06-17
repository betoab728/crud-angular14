import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
id: number = 0;
operacion: string = 'AGREGAR ';

  constructor( private fb: FormBuilder,
private __productService: ProductService,
private router: Router,
private toastr: ToastrService,
private aRouter: ActivatedRoute
    ) {

    this.form = this.fb.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],   
   })

    this.id =Number( this.aRouter.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {

    if (this.id !== 0) {
      this.operacion = 'EDITAR ';

      this.getProduct(this.id);
    
    }
  }


  addProduct() {
   
    const product: Product = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      price: this.form.get('price')?.value,
      stock: this.form.get('stock')?.value,
    }

    if (this.id !== 0) {  
      this.loading = true;
      product.id = this.id;
      this.__productService.editProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.info( `El proyecto ${product.name} fue editado con exito` , 'Proyecto Editado');
        this.router.navigate(['/']);
      })
      return;

    } else {
        //agregar
    this.loading = true;
    this.__productService.addProduct(product).subscribe(() => {
     this.loading = false;
     this.toastr.success( `El producto ${product.name} fue creado con exito` , 'Proyecto Creado');
      this.router.navigate(['/']);
    })
    }  
    


  }

  getProduct (id : number) {
    this.loading = true;
    return this.__productService.getProduct(id).subscribe((data : Product) => {

      this.loading = false;
        this.form.setValue({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock
        })

      });
  
    }
}
