import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router"; //function is to extract the id from the URL
import { HousingService } from "../housing.service"; //responsible for fetching the data.
import { HousingLocation } from "../housing-location-interface"; //checks the data of define the structure of the data
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  imports: [CommonModule, ReactiveFormsModule],
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
    <section class="listing-application">
      <h2 class="section-heading">apply to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName" />

        <label for="last-name">Last Name </label>
        <input id="last-name" type="text" formControlName="lastName" />

        <label for="email">email</label>
        <input id="email" type="text" formControlName="email" />
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>`,
  styleUrls: ["./details-component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  HousingService = inject(HousingService);

  Data: HousingLocation | undefined;
  // housingLocationId = -1;

  // lets create a form object
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params["id"], 10);

    this.HousingService.getHousingLocationById(housingLocationId).then(
      (housingLocation) => {
        this.Data = housingLocation;
      }
    );
  }

  //apply on click.
  submitApplication() {
    this.HousingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
