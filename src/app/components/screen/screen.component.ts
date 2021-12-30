import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  @Input() toptextInScreen?: string;

  @Input() bottomtextInScreen?: string;

  
  
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
