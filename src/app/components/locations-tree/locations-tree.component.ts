import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { Locations } from 'src/app/models/locations';
@Component({
  selector: 'app-locations-tree',
  templateUrl: './locations-tree.component.html',
  styleUrls: ['./locations-tree.component.css'],
})
export class LocationsTreeComponent implements OnInit {
  constructor() {}

  locations: [];
  fillLocations() {
    for (let i = 0; i < 10; ++i) {
      let loc = new Locations();
      if (i % 2) loc.base_bu = 'LTI-USA-';
      else loc.base_bu = 'LTI-INDIA-';
      loc.location_id = i;
    }
  }
  items: TreeviewItem[];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true,
  });
  ngOnInit() {
    this.items = [
      new TreeviewItem({
        text: 'IT',
        value: 9,
        children: [
          {
            text: 'Programming',
            value: 91,
            children: [
              {
                text: 'Frontend',
                value: 911,
                children: [
                  { text: 'Angular 1', value: 9111 },
                  { text: 'Angular 2', value: 9112 },
                  { text: 'ReactJS', value: 9113 },
                ],
              },
              {
                text: 'Backend',
                value: 912,
                children: [
                  { text: 'C#', value: 9121 },
                  { text: 'Java', value: 9122 },
                  { text: 'Python', value: 9123, checked: false },
                ],
              },
            ],
          },
          {
            text: 'Networking',
            value: 92,
            children: [
              { text: 'Internet', value: 921 },
              { text: 'Security', value: 922 },
            ],
          },
        ],
      }),
    ];
  }
}
