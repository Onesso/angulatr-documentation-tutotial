import { Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location-interface";

//below is service and it is made available to the entire app
@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:3000/locations";

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}?id=${id}`); //filtration
    const locationjson = await data.json();

    return locationjson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Home application received: first name: ${firstName}, last name: ${lastName}, email: ${email}`
    );
  }
}
