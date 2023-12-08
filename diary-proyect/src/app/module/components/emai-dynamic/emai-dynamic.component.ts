import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emai-dynamic',
  templateUrl: './emai-dynamic.component.html',
  styleUrls: ['./emai-dynamic.component.scss'],
})
export class EmaiDynamicComponent {
  emailFormDynamic!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emailFormDynamic = this.fb.group({
      email: [
        '',
        [
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
    });
  }
}
