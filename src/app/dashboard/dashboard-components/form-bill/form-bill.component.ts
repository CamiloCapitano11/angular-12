import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.css']
})
export class FormBillComponent implements OnInit {
	errorfirstFormGroup: FormGroup=Object.create(null);
	errorsecondFormGroup: FormGroup=Object.create(null);
  errorthirdFormGroup: FormGroup = Object.create(null);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
		// error
		this.errorfirstFormGroup = this._formBuilder.group({
      idBill: ['', Validators.required],
      typePay: ['', Validators.required]
		});
		this.errorsecondFormGroup = this._formBuilder.group({
		      errorsecondCtrl: ['', Validators.required]
		});
    this.errorthirdFormGroup = this._formBuilder.group({
      errorsecondCtrl: ['', Validators.required]
    });
  }

}
