import { stringify } from "querystring";

let favoriteCityId:string = "rome";
console.log(favoriteCityId);
favoriteCityId= "paris";
console.log(favoriteCityId);
const citiesId:string[]= ["paris", "nyc", "rome", "rio-de-janeiro"];
//citiesId=[];
citiesId.push("tokyo");
console.log(citiesId);

function getWeather(cityId:string):{city:string,temperature:number} {
    let city:string = cityId.toUpperCase();
    const temperature:number = 20;
    return {city,temperature};
}
const weather = getWeather(favoriteCityId);
console.log(weather);

const { city, temperature } = weather;
console.log(weather.city);
console.log(weather.temperature);
const [parisId, nycID, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycID);
console.log(othersCitiesId.length);

class Trip {

    protected _price:number=0;
    constructor(private _id:string, private _name:string, private _imageUr:string) {
      
    }

    static getDefaultTrip() {
        return new Trip('rio de janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
    get name():string {
        return this._name
    }

    toString():string {
        return `Trip [ ${this._id} ,${this._name}, ${this._imageUr}, ${this._price}]`;
    }
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }
}
class FreeTrip extends Trip {

    constructor(private id:string, private nom:string, private img:string) {
        super(id, nom, img);
        this._price = 0;
    }
    toString() : string {
        let a = super.toString();
        return `Free + ${a}`;
    }
}
let parisTrip = new Trip("paris", "Paris", "img/paris.jpg");

console.log(parisTrip);
console.log(parisTrip.name);
parisTrip.toString();
parisTrip.price = 100;
parisTrip.toString();
const defaultTrip = Trip.getDefaultTrip();
defaultTrip.toString();
const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
freeTrip.toString();

class TripService {

    protected _set:Set<Trip>;
    constructor() {
        this._set = new Set();
        this._set.add(new Trip('paris', 'Paris', 'img/paris.jpg'))
       .add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'))
      .add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }
}
class Service extends TripService {
    constructor() {
        super();
    }

    findByName(tripName:string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let tripSet = this._set;
                for (let trip of tripSet) {
                    if (trip.name() === tripName) {
                        resolve(trip);
                    }
                    reject(`No trip found with name ${tripName}`)
                }
                
            }, 2000)
        });
    }
}

class PriceService {
    protected _mapPrice: Map<string,number> = new Map();
    constructor() {
        // TODO Map of 2 trips     
       
        this._mapPrice.set('paris', 100)
        .set('rio-de-janeiro', 800);
    }
}
class ServiceP extends PriceService {
    constructor() {
        super();

    }
    // no price for 'nantes'     }
    findPriceByTripId(tripId:string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const price = this._mapPrice.get(tripId);
                if (price) {
                    resolve(price);
                } else {
                    reject(`No price for trip id ${tripId}`);
                }
            }, 2000)
        });
    }
}

const tripService = new Service();
tripService.findByName("Paris")
    .then(tripFind => console.log(`Trip found : ${tripFind}`)) // ici
    .catch(err => console.log(err));
const priceService = new ServiceP();
priceService.findPriceByTripId("paris")
    .then(tripFind => console.log(`Price found : ${tripFind}`))
    .catch(err => console.log(err)); // là