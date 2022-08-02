import { Component, OnInit } from '@angular/core';
import { CarOfferService } from '../car-offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offers: Array<any> = []
  currentPage: number = 1;
  total: number = 0;
  perPage: number = 0;
  totalPages: number = 0;

  constructor(private offerService: CarOfferService) { }

  ngOnInit(): void {

    this.getPagedOffers();

  }

  getPagedOffers() {

    this.offerService.getPaginatedCarOffers(this.currentPage).subscribe((response: any) => {

      console.log(response);

      this.offers = [...response.data]
      this.total = response.total;
      this.perPage = response.per_page;
      this.totalPages = response.total_pages;

    })

  }

  pageChangeEvent(event: number) {
    this.currentPage = event;
    this.getPagedOffers()
  }

}
