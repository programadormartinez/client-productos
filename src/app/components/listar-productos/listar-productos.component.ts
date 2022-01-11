import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {
  productos: Array<Producto> = [];
  constructor(private productoService: ProductoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    }, err => {
      console.log(err);
    })
  }

  eliminarProducto(id: any){
    this.productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.warning('El producto ha sido eliminado.');
      this.getProducts();
    }, err => {
      console.log(err);
    })
  }

}
