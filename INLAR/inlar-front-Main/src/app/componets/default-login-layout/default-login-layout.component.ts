import { Component, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule,MatSlideToggleModule ],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent  {
 @Input() title: string = "";
 @Input() primaryBtnText: string = "";
 @Input() secondaryBtnText: string = "";
 hide = true;
}

