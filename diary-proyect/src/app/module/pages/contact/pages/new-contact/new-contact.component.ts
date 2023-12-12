import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmaiDynamicComponent } from 'src/app/module/components/emai-dynamic/emai-dynamic.component';
import { DialogLoadingService } from 'src/app/module/components/service/dialog-loading.service';
import { ContactService } from 'src/app/module/services/contact.service';
import { DirectivesDirective } from 'src/app/shared/directives.directive';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent implements OnInit {
  private numContacts = new BehaviorSubject<number>(0);
  numContacts$ = this.numContacts.asObservable();

  @ViewChild(DirectivesDirective, { read: ViewContainerRef })
  public containerDynamicEmail!: ViewContainerRef; // variable para guardar mi input de email
  private containerEmail!: ComponentRef<EmaiDynamicComponent>;


  selectedType: string = ''; // Variable para almacenar el tipo seleccionado
  types = [
    { value: 1, name: 'Casa' },
    { value: 2, name: 'Telefono' },
    { value: 3, name: 'Whatsapp' },
  ];

  formRegister!: FormGroup;
  contactPhone = this.fb.array([]);
  contactEmail = this.fb.array([]);
  public contactToEditId: any;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private createcontactService: ContactService,
    private router: Router,
    private dialogLoading: DialogLoadingService,

  ) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      // contactEmail: this.fb.array([],[Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      contactEmail: this.fb.array([
        this.fb.control('', [
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
      ]),
      contactAlias: [''],
      contactCompany: [''],
      contactBirthday: ['', Validators.required],
      contactPhoto: [''],
      contactNotes: [''],
      contactPhone: this.fb.array([]), // También puedes aplicar Validators.required si el FormArray no debe estar vacío
    });
  }

  saveContact() {
    const modelRegister = {
      contactFirstName: this.formRegister.value.contactFirstName,
      contactLastName: this.formRegister.value.contactLastName,
      contactEmail: this.formRegister.value.contactEmail,
      contactAlias: this.formRegister.value.contactAlias,
      contactCompany: this.formRegister.value.contactCompany,
      contactBirthday: this.formRegister.value.contactBirthday,
      contactPhoto: this.formRegister.value.contactPhoto,
      contactNotes: this.formRegister.value.contactNotes,
      contactPhone: this.formRegister.value.contactPhone,
    };

    if (this.formRegister.valid) {
      this.dialogLoading.show(
        'Espere por favor, Cargando...',
        'Creando Contacto'
      );
      this.createcontactService.createContact(modelRegister).subscribe({
        next: (response) => {
          console.log(response.succeed);
          console.log(modelRegister);

          if (response.succeed) {
            this.snackbar.open('Usuario creado exitosamente', 'Aceptar', {
              duration: 10 * 1000,
              panelClass: ['green-snackbar'],
            });
            // this.router.navigate(['/list-contact']);

            this.numContacts.next(this.numContacts.getValue() + 1);
            console.log(this.numContacts.next(this.numContacts.getValue() + 1));
          }
        },
        error: (err) => {
          console.log(err);
          this.snackbar.open('Error al crear el usuario', 'Aceptar', {
            duration: 10 * 1000,
            panelClass: ['red-snackbar'],
          });
        },
        complete: () => {
          this.dialogLoading.finish();

        },
      });
    } else {
      this.snackbar.open('Error al crear el usuario', 'Aceptar', {
        duration: 10 * 1000,
        panelClass: ['red-snackbar'],
      });
      console.log(this.formRegister.value);
      this.formRegister.markAllAsTouched();
      return;
    }
  }


  createComponentEmail() {

      this.containerEmail =
      this.containerDynamicEmail.createComponent(EmaiDynamicComponent);

      this.count = this.count ? this.count + 1 : 1;
      console.log(this.count);
      
    

  }
  deleteComponentEmail() {
    if (this.containerEmail ) {
      this.containerEmail.destroy();
      this.count = this.count ? this.count - 1 : 0;
    }
  }

public count?: number;





  onTypePhone(event: Event, typeSelected: number) {
    this.selectedType = (event.target as HTMLInputElement).value;
    const recurrent = this.getcontactPhoneFormArray.at(typeSelected);

    recurrent.get('typePhone')?.setValue(this.selectedType);

    console.log(recurrent);
  }

  get getcontactEmailFormArray() {
    return this.formRegister.get('contactEmail') as FormArray;
  }

  get getcontactPhoneFormArray() {
    return this.formRegister.get('contactPhone') as FormArray;
  }

  deletePhone(i: number) {
    this.getcontactPhoneFormArray.removeAt(i);
  }
  addPhone() {
    this.getcontactPhoneFormArray.push(this.fb.control(''));
  }

  addEmail() {
    this.getcontactEmailFormArray.push(
      this.fb.control('', [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ])
    );
  }

  deleteEmail(i:number){
    this.getcontactEmailFormArray.removeAt(i);
  }

  isValidField(field: string): boolean | null {
    const control = this.formRegister.controls[field];
    return control && control.invalid && control.touched;
  }

  isFormatField(field: any): boolean | null {
    const control = this.getcontactEmailFormArray;
    {
      return control && control.invalid && control.touched;
    }
  }

  // validatorEmail(){
  //   if(this.getcontactEmailFormArray.invalid){
  //     this.snackbar.open('El correo tiene un formato invalido', 'Aceptar', {
  //       duration: 10 * 1000,
  //       panelClass: ['red-snackbar']
  //     })
  //     if(this.getcontactEmailFormArray.valid){
  //         console.log("validoo");

  //       }
  //     }

  //     return

  // }

  // isFormatField(field: any): boolean | null {
  //   const control = this.fb.array(field);{
  //     return control && control.invalid && control.touched;
  //   }
  // }
}
