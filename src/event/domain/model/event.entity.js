export class Event {
    constructor({id = null, title = '', category = '', location = '', date = '', price = 0, status = 'ACTIVE', sold = 0, image = ''}) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.location = location;
        this.date = date;
        this.price = price;
        this.status = status;
        this.sold = sold;
        this.image = image;
    }
}