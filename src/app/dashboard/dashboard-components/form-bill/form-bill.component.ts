import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillsService } from '../services/bills.service';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.css']
})
export class FormBillComponent implements OnInit {
	errorfirstFormGroup: FormGroup=Object.create(null);
	errorsecondFormGroup: FormGroup=Object.create(null);
  errorthirdFormGroup: FormGroup = Object.create(null);
  
  formulario: FormGroup = Object.create(null);

  constructor(private _formBuilder: FormBuilder, private api: BillsService, public dialog: MatDialog) { }

  ngOnInit(): void {
		// error
		this.errorfirstFormGroup = this._formBuilder.group({
      idBill: ['', Validators.required],
      typePay: ['', Validators.required]
		});
		this.errorsecondFormGroup = this._formBuilder.group({
      document: ['', Validators.required],
      clientName: ['', Validators.required]
		});

    this.errorthirdFormGroup = this._formBuilder.group({
      item: ['', Validators.required],
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      item2: ['', Validators.required],
      product2: ['', Validators.required],
      quantity2: ['', Validators.required],
      price2: ['', Validators.required],
      discount: ['', Validators.required]
    });
    this.aniadirProducto();
  }

  get datosProductos(): FormArray{
    return this.errorthirdFormGroup.get('productos') as FormArray;
  }

  crearFormulario() {
    this.formulario = this._formBuilder.group({
      datosProductos: new FormControl('')
    });
  }

  aniadirProducto() {
    const productoForm = this._formBuilder.group({
      item: new FormControl(''),
      quantity: new FormControl(''),
      product: new FormControl(''),
      price: new FormControl(''),
    });

    this.datosProductos.push(productoForm);
  }

  enviarData(){
    debugger
    var valueIVA = (((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) * 0.19);

    var valueDiscount = (((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) * (this.errorthirdFormGroup.value.discount / 100));

    var jsonData = {
      NumeroFactura: this.errorfirstFormGroup.value.idBill,
      Fecha: Date.now,
      TipodePago: this.errorfirstFormGroup.value.typePay,
      Detalle:[
         {
            Item: this.errorthirdFormGroup.value.item,
            Producto: this.errorthirdFormGroup.value.product,
            Cantidad: this.errorthirdFormGroup.value.quantity,
            PrecioUnitario: this.errorthirdFormGroup.value.price
         },
         {
            Item: this.errorthirdFormGroup.value.item2,
            Producto: this.errorthirdFormGroup.value.product2,
            Cantidad: this.errorthirdFormGroup.value.quantity2,
            PrecioUnitario: this.errorthirdFormGroup.value.price2
         }
      ],
      DocumentoCliente: this.errorsecondFormGroup.value.document,
      NombreCliente: this.errorsecondFormGroup.value.clientName,
      Descuento: valueDiscount,
      IVA: valueIVA
    };

    var response = this.api.sendBill(jsonData);
    response.subscribe(data => {
      return data;
      this.openDialog();
    })
  }

  openDialog(): void {
    debugger
    // CALCULO IVA
    let valueIVA = ((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) - 
    (((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) * (this.errorthirdFormGroup.value.discount / 100)) + 
    ((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) * 0.19;

    //CALCULO DESCUENTO
    let valueTotal = ((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) - 
    (((this.errorthirdFormGroup.value.quantity * this.errorthirdFormGroup.value.price) + 
    (this.errorthirdFormGroup.value.quantity2 * this.errorthirdFormGroup.value.price2)) * (this.errorthirdFormGroup.value.discount / 100));
    let dialogRef = this.dialog.open(DataDialogComponent, {
      width: '450px',
      data: { 
        idBill: this.errorfirstFormGroup.value.idBill,
        IVA: valueIVA, 
        Total: valueTotal,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
}