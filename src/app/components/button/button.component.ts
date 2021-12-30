import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() buttonValue?: string;

  @Output() btnclick = new EventEmitter();

  isHovered = false;

  constructor() { }

  ngOnInit(): void {
  }

  btnClick() {
    this.btnclick.emit()
  }

  onHover() {
    this.isHovered = !this.isHovered;
  }

}
