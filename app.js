let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
//citiesId=[];
citiesId.push("tokyo");
console.log(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    const temperature = 20;
    return { city, temperature }
}
const weather = getWeather(favoriteCityId);
console.log(weather);

const { city, temperature } = weather;
console.log(city);
console.log(temperature);
const [parisId, nycID, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycID);
console.log(othersCitiesId.length);
class Trip {

    constructor(id, name, imageUr) {
        this._id = id;
        this._name = name;
        this._imageUr = imageUr;
    }

    static getDefaultTrip() {
        return new Trip('rio de janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
    get name() {
        return this._name
    }

    toString() {
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

    constructor(id, nom, img) {
        super(id, nom, img);
        this._price = 0;
    }

    toString() {
        let a = super.toString();
        console.log("Free" + a);
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
    constructor() {

        this._set = new Set();
        this._set.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this._set.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this._set.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }
}
class Service extends TripService {
    constructor() {
        super();
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                for (const trip of this._set) {
                    if (trip.name === tripName) {
                        resolve(trip);
                    }
                    reject(`No trip found with name ${tripName}`)
                }
            }, 2000)


        });
    }
}

class PriceService {
    constructor() {
        // TODO Map of 2 trips     
        this._mapPrice = new Map();
        this._mapPrice.set('paris', 100);
        this._mapPrice.set('rio-de-janeiro', 800);
    }
}
class ServiceP extends PriceService {
    constructor() {
        super();

    }
    // no price for 'nantes'     }
    findPriceByTripId(tripId) {
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


