
export default class Country {
    constructor(id, name, information, imageUrl) {
        this.id = id;
        this.name = name;
        this.information = information;
        this.imageUrl = imageUrl;
        this.reviews = [];
    }
}