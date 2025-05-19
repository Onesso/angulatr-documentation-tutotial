import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router"; //function is to extract the id from the URL
import { HousingService } from "../housing.service"; //responsible for fetching the data.
import { HousingLocation } from "../housing-location-interface"; //checks the data of define the structure of the data

@Component({
  selector: "app-details",
  imports: [],
  template: `<article>
    <img
      class="listing-photo"
      [src]="Data?.photo"
      alt="Exterior photo of {{ Data?.name }}"
      crossorigin
    />
    <section class="listing-description">
      <h2 class="listing-heading">{{ Data?.name }}</h2>
      <p class="listing-location">{{ Data?.city }}, {{ Data?.state }}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{ Data?.availableUnits }}</li>
        <li>Does this location have wifi: {{ Data?.wifi }}</li>
        <li>Does this location have laundry: {{ Data?.laundry }}</li>
      </ul>
    </section>
  </article>`,
  styleUrls: ["./details-component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  HousingService = inject(HousingService);

  Data: HousingLocation | undefined;
  housingLocationId = -1;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.Data = this.HousingService.getHousingLocationById(housingLocationId);
  }
}
