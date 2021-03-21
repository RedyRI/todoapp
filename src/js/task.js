import { compareAsc,compareDesc, format } from 'date-fns'
import { idGen } from './idGen'

class Task {
    constructor(title, priority, description, category) {
        this.id = idGen();
        this.description = description;
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.done = false;
        this.date = format(new Date(), 'yyy/dd/MM HH:mm'); 
        this. edit = false;
    }

    set _title(value) {
        this.title = value;
    }

    set _description(value) {
        this.description = value;
    }

    set _category(value) {
        this.category = value;
    }

    set _priority(value) {
        this.priority = value;
    }

    set _done(value) {
        this.done = value;
    } 
}

export {
    Task,
}