import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/services/basket/model';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.scss'],
})
export class AppointmentItemComponent implements OnInit {
  @Input() appointment: Appointment;
  @Output() public removeAppointment = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
