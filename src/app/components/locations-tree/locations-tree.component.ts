import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { BaseLocation } from 'src/app/enums/base-location.enum';
import { Buildings } from 'src/app/enums/buildings.enum';
import { Departments } from 'src/app/enums/departments.enum';
import { Locations } from 'src/app/models/locations';
import { enumSelector } from 'src/app/services/common.service';
@Component({
  selector: 'app-locations-tree',
  templateUrl: './locations-tree.component.html',
  styleUrls: ['./locations-tree.component.css'],
})
export class LocationsTreeComponent implements OnInit {
  constructor() {}

  locations: Locations[] = [];
  buildings = enumSelector(Buildings);
  departments = enumSelector(Departments);
  baseLocations = enumSelector(BaseLocation);
  getRandomDept() {
    let ix = Math.floor(Math.random() * (5 - 1) + 1); //The maximum is exclusive and the minimum is inclusive
    return this.departments.find((b) => b.value == ix).title;
  }
  getRandomBuilding(): string {
    let ix = Math.floor(Math.random() * (5 - 1) + 1);
    return this.buildings.find((b) => b.value == ix).title;
  }
  getRandomLoc(val): string {
    /*
    LTI_USA = 1,
        NY = 1,
        NJ = 2,
        CT = 3,
        TX = 4,
        FL = 5,
    LTI_INDIA = 2,
        MUM = 6,
        CAL = 7,
        PUN = 8,
    LTI_DUBAI = 4,
        ABU = 9,
        SHA = 10,
        AJM = 11,
    LTI_CANADA = 3,
        QUE = 12,
        ONT = 13,
        MAN = 14,
        SASK = 15, */

    let i = this.buildings.find((b) => b.title == val).value;
    let ix;

    switch (i) {
      case 1:
        ix = Math.floor(Math.random() * (6 - 1) + 1);
        return this.baseLocations.find((b) => b.value == ix).title;
        break;
      case 2:
        ix = Math.floor(Math.random() * (9 - 6) + 6);
        return this.baseLocations.find((b) => b.value == ix).title;
        break;
      case 3:
        ix = Math.floor(Math.random() * (16 - 12) + 12);
        return this.baseLocations.find((b) => b.value == ix).title;
        break;
      case 4:
        ix = Math.floor(Math.random() * (12 - 9) + 9);
        return this.baseLocations.find((b) => b.value == ix).title;
        break;
    }
  }

  fillLocations() {
    let loc: Locations;
    for (let i = 1; i <= 10; ++i) {
      loc = new Locations();
      loc.location_id = i;
      loc.base_bu = this.getRandomBuilding();
      //  {  text:  this.getRandomBuilding() ,value:  loc.location_id
      // }

      loc.base_location = this.getRandomLoc(loc.base_bu);
      loc.base_dept = this.getRandomDept();
      loc.maximum_seats = Math.floor(Math.random() * (201 - 1) + 1);

      // if (i > 4) {
      //   loc.parent_id = Math.floor(Math.random() * (5 - 1) + 1);
      // }
      this.locations.push(loc);
    }
    console.log(this.locations);
  }
  items: TreeviewItem[] = [];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    hasAllCheckBox: false,

  });
  ngOnInit() {
    this.fillLocations();

    this.locations.forEach((element) => {
      let bu = this.items?.find((e) => e.text === element.base_bu);
      if (bu) {
        let loc = bu.children?.find((c) => c.text == element.base_location);
        if (loc) {
          let dep = loc.children?.find((d) => d.text == element.base_dept);
          if (dep) {
            console.log(loc, dep);
          } else {
            loc.children.push(
              new TreeviewItem({
                text: element.base_dept,
                value: element.location_id,
                checked: false,
              })
            );
          }
        } else {
          bu.children.push(
            new TreeviewItem({
              text: element.base_location,
              value: element.location_id,
              checked: false,
              children: [
                {
                  text: element.base_dept,
                  value: element.location_id,
                  checked: false,
                },
              ],
            })
          );
        }
      } else {
        this.items.push(
          new TreeviewItem({
            text: element.base_bu,
            value: element.location_id,
            checked: false,
            collapsed: true,
            children: [
              {
                text: element.base_location,
                value: element.location_id,
                checked: false,
                children: [
                  {
                    text: element.base_dept,
                    value: element.location_id,
                    checked: false,
                  },
                ],
              },
            ],
          })
        );
      }
    });

    // this.items = [
    //   new TreeviewItem({
    //     text: 'IT',
    //     value: 9,
    //     children: [
    //       {
    //         text: 'Programming',
    //         value: 91,
    //         children: [
    //           {
    //             text: 'Frontend',
    //             value: 911,
    //             children: [
    //               { text: 'Angular 1', value: 9111 },
    //               { text: 'Angular 2', value: 9112 },
    //               { text: 'ReactJS', value: 9113 },
    //             ],
    //           },
    //           {
    //             text: 'Backend',
    //             value: 912,
    //             children: [
    //               { text: 'C#', value: 9121 },
    //               { text: 'Java', value: 9122 },
    //               { text: 'Python', value: 9123, checked: false },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         text: 'Networking',
    //         value: 92,
    //         children: [
    //           { text: 'Internet', value: 921 },
    //           { text: 'Security', value: 922 },
    //         ],
    //       },
    //     ],
    //   }),
    // ];
  }
}
