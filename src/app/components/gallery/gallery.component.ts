import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  _albums = [];
  constructor() {

  }
  ngOnInit(): void {}
  open(index: number): void {
    // open lightbox
  }

  close(): void {
    // close lightbox programmatically
  }
}
