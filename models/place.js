export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // {lat: 0.134, lng: 124.43},
    this.id = id; // new Date().toString() + Math.random().toString();
  }
}
