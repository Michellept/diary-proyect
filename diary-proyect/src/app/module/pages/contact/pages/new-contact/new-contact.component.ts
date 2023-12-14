import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { PhoneDynamicComponent } from 'src/app/module/components/phone-dynamic/phone-dynamic.component';
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
  public dynamicPhoneRef!: ViewContainerRef; // variable para guardar mi input de email
  private componentRef: ComponentRef<PhoneDynamicComponent>[] = [];
  public countComponent!: number;
  selectedType: string = '';
  types = [
    { value: 1, name: 'Casa' },
    { value: 2, name: 'Telefono' },
    { value: 3, name: 'Whatsapp' },
  ];

  formRegister!: FormGroup;
  contactPhone = this.fb.array([]);
  contactEmail = this.fb.array([]);
  public contactToEditId: any;
  contactTags = this.fb.array([]);
  tagToLocalStorage: string[] = [];
  tagSelected: string[] = [];
  inputSelect: string[] = [];
  availableTags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private createcontactService: ContactService,
    private dialogLoading: DialogLoadingService
  ) {
    // this.tagToLocalStorage = localStorage.getItem('tags');
    // console.log("LocalStorageTag",this.tagToLocalStorage);
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
      contactTags:[this.tagSelected],
      newTag: [''],
      contactPhone: this.fb.array([]),
    });


    // carga la informacion guardada en localStorage de Tags
    const storedTags = localStorage.getItem('tags');
    if (storedTags) {
      this.tagToLocalStorage = JSON.parse(storedTags);
      console.log(this.tagToLocalStorage);
    }

    // this.contactTags = this.formRegister.get('contactTags') as FormArray;
    // this.contactTags.clear();
    // this.tagToLocalStorage.forEach((tag) => {
    //   this.contactTags.push(this.fb.control(tag));
    // });

    this.saveTags();
  }

  saveContact() {

    console.log(this.tagSelected);
    this.formRegister.value.contactTags=this.tagSelected;
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
      contactTags: this.formRegister.value.contactTags,
    };
    console.log(modelRegister);

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

  createComponentPhone(): void {
    const component = this.dynamicPhoneRef.createComponent(
      PhoneDynamicComponent
    );
    this.componentRef.push(component);

    const componentIndex = this.componentRef.indexOf(component) + 2;
    (component.instance as PhoneDynamicComponent).keyPhone = componentIndex;
  }
  deleteComponentPhone(): void {
    const index = this.componentRef.length - 1;
    if (index >= 0 && this.componentRef.length) {
      const componentRefToDelete = this.componentRef[index];
      componentRefToDelete.destroy();
      this.componentRef.splice(index, 1);
      // this.componentRef[index-1].destroy();
    }

    // if (this.componentRef && this.componentRef.hostView) {
    //   // this.componentRef.destroy();
    //   // this.count = this.count ? this.count - 1 : 0;
    // }
  }
  get getcontactEmailFormArray() {
    return this.formRegister.get('contactEmail') as FormArray;
  }
  addEmail() {
    this.getcontactEmailFormArray.push(
      this.fb.control('', [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ])
    );
  }

  deleteEmail(i: number) {
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

  get getContactTagFormArray() {
    return this.formRegister.get('contactTags') as FormArray;
  }

  deleteTag(i: number) {
    this.tagSelected.splice(i);
  }
  deleteTagLocalStorage(i: number) {
    this.tagToLocalStorage.splice(i, 1);
    localStorage.setItem('contactTags', JSON.stringify(this.tagToLocalStorage));
    this.tagToLocalStorage = JSON.parse(localStorage.getItem('contactTags')!);
    this.formRegister.value.contactTags = this.tagToLocalStorage;
  }

  saveTags() {
      const newTag = this.formRegister.get('newTag')?.value;
    
      if (newTag && !this.tagToLocalStorage.includes(newTag)) {
        // Añadir el nuevo tag solo si no está duplicado
        this.tagToLocalStorage.push(newTag);
    
        // Actualizar el localStorage con la clave 'tags'
        localStorage.setItem('tags', JSON.stringify(this.tagToLocalStorage));
    
        // Actualizar el valor del formulario
        this.formRegister.value.contactTags = this.tagToLocalStorage;
      }
    
      this.formRegister.get('newTag')?.setValue('');
    
    
  }

  addSelectedTagFromSelect() {
    if(this.tagSelected && !this.tagSelected.includes(this.formRegister.get('contactTags')?.value))
    this.tagSelected.push(this.formRegister.get('contactTags')?.value);
    console.log(this.tagSelected);
  }
}

