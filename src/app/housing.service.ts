import { Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location-interface";

//below is service and it is made available to the entire app
@Injectable({
  providedIn: "root",
})

export class HousingService {

  url = "http://localhost:3000/locations"; //this is an endpoint where the data is comming from.

  async getAllHousingLocations(): Promise<HousingLocation[]> {  //return type annotation; the promise when yielded it will be of type HousingLocation array.
    const data = await fetch(this.url);
    return (await data.json()) ?? []; // ?? nullishing operator; this means if the data is not available it will return an empty array.
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}?id=${id}`); //a url with a quary parameter.
    const locationjson = await data.json();

    return locationjson[0] ?? {}; // we are expecting the first array or an empty object.
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Home application received: first name: ${firstName}, last name: ${lastName}, email: ${email}`
    );
  }
}
