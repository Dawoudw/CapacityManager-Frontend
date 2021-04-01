import {Component, OnInit, ViewChild} from '@angular/core';
import {Seat} from "../../models/Seat";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  @ViewChild('paginator') paginator: MatPaginator;

  seats : Seat[] = [
    {seatId: 1, availabilityStatus: 'Open', cost: 50000, seatLocation: 'USA', locationId: 1 },
    {seatId: 2, availabilityStatus: 'Closed', cost: 75000, seatLocation: 'India', locationId: 2 },
    {seatId: 3, availabilityStatus: 'Open', cost: 111000, seatLocation: 'USA', locationId: 1 },
    {seatId: 4, availabilityStatus: 'Closed', cost: 82000, seatLocation: 'London', locationId: 3 },
    {seatId: 5, availabilityStatus: 'Open', cost: 77000, seatLocation: 'India', locationId: 2 },
    {seatId: 6, availabilityStatus: 'Open', cost: 45000, seatLocation: 'India', locationId: 2 },
    {seatId: 7, availabilityStatus: 'Closed', cost: 69000, seatLocation: 'Poland', locationId: 4 },
    {seatId: 8, availabilityStatus: 'Closed', cost: 40000, seatLocation: 'Germany', locationId: 5 },
    {seatId: 9, availabilityStatus: 'Open', cost: 94000, seatLocation: 'USA', locationId: 1 },
    {seatId: 10, availabilityStatus: 'Open', cost: 11000, seatLocation: 'Scotland', locationId: 7 },
    {seatId: 11, availabilityStatus: 'Closed', cost: 22000, seatLocation: 'India', locationId: 2 },
    {seatId: 12, availabilityStatus: 'Open', cost: 87000, seatLocation: 'USA', locationId: 1 },
    {seatId: 13, availabilityStatus: 'Closed', cost: 47000, seatLocation: 'London', locationId: 3 },
    {seatId: 14, availabilityStatus: 'Open', cost: 22500, seatLocation: 'India', locationId: 2 },
    {seatId: 15, availabilityStatus: 'Open', cost: 36700, seatLocation: 'India', locationId: 2 },
    {seatId: 16, availabilityStatus: 'Closed', cost: 21900, seatLocation: 'Poland', locationId: 4 },
    {seatId: 17, availabilityStatus: 'Closed', cost: 56700, seatLocation: 'Finland', locationId: 6 },
    {seatId: 18, availabilityStatus: 'Open', cost: 22100, seatLocation: 'Poland', locationId: 4 },
    {seatId: 19, availabilityStatus: 'Open', cost: 51000, seatLocation: 'London', locationId: 3 }

  ];

  dataSource = new MatTableDataSource<Seat>(this.seats)


  currentItemsToShow = this.seats.slice(0,9);

  pageSize = 9;


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.currentItemsToShow = this.dataSource.filteredData.slice(0,this.pageSize);
  }

  async onPageChange($event) {
    this.currentItemsToShow = this.seats;
    this.currentItemsToShow = this.seats.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

}




