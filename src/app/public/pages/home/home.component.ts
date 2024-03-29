import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showModal: boolean = false;
  toggleModal(value: boolean) {
    this.showModal = value;
  }
}
