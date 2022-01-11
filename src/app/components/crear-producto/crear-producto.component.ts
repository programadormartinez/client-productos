import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  titulo = 'Crear producto';
  id: string | null;
  productoForm= new FormGroup(
    {
      nombre: new FormControl('', {
        validators: Validators.required,
      }),
      categoria: new FormControl('',
      {
        validators: Validators.required,
      }),
      ubicacion: new FormControl('',
      {
        validators: Validators.required,
      }),
      precio: new FormControl('',
      {
        validators: Validators.required,
      })
    }
  );
  constructor(private router: Router , private toastr: ToastrService, private productoService: ProductoService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarProducto(){
    const producto: Producto = this.productoForm.value;
    console.log(producto);
    if (this.id !== null) {
      //editamos producto
      this.productoService.editarProducto(this.id, producto).subscribe(data => {
        console.log(data);
        this.toastr.success('Producto actualizado', 'El producto ha sido actualizado exitosamente!');
        this.router.navigate(['/']);
        this.productoForm.reset();
      }, err => {
        console.log(err);
      })
    }else{
      //agregamos producto
      this.productoService.guardarProducto(producto).subscribe(data => {
        this.toastr.success('Producto cargado', 'El producto ha sido enviado exitosamente!');
        this.router.navigate(['/']);
        this.productoForm.reset();
      }, err => {
        console.log(err);
      });
    }


  }

  get nombre() {
    return this.productoForm.get('nombre');
  }
  get categoria() {
    return this.productoForm.get('categoria');
  }
  get ubicacion() {
    return this.productoForm.get('ubicacion');
  }
  get precio() {
    return this.productoForm.get('precio');
  }
  editarProducto(){

  }
  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio:data.precio
        });
      }, err => {
        console.log(err);

      });
    }
  }
}
