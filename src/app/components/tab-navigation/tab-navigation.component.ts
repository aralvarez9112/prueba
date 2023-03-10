import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.css']
})
export class TabNavigationComponent implements OnInit {

  @Input() activeTabIndex: Number;
  @Input() admin: boolean;
  constructor() { }

  ngOnInit(): void {}
}
