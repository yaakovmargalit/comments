import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInputComponent implements OnInit {
  @Input() users
  @Output() selectedUser = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onSelectUser(ev) {
    this.selectedUser.emit(ev.target.value)
  }
}
