import { compareAsc,compareDesc, format } from 'date-fns'
import { idGen } from './idGen'

class Task {
    constructor(title, priority, description, category) {
        this.id = idGen();
        this.description = description;
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.date = format(new Date(), 'yyy-dd-MM HH:mm'); 
    }

    set _title(value) {
        this.title = value;
    }

    set _description(value) {
        this.description = value;
    }
}

export {
    Task,
}