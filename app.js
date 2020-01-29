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
        let a= super.toString();
        console.log("Free"+a);
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