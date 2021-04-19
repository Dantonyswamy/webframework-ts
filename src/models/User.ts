import { Sync } from './Sync'
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';
export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}
const rootUrl = 'http://localhost:3000/user';
//using composition we bring the instance of Eventing class into the User class
export class User {

    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
    public attributes: Attributes<UserProps> 
    
    constructor(private attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs)
    }  
    get on() {
        return this.events.on
    }
    get trigger() {
        return this.events.trigger
    }

    get get() {
        return this.attributes.get
    }
    set(update:UserProps):void {
        this.attributes.set(update);
        this.events.trigger('change');
    }
    fetch(): void {
        const id = this.get('id');
        if (typeof id != 'number') {
            throw new Error('Cannot perform fetch without an id')
        }
        this.sync.fetch(id).then((response: AxiosResponse) => {
            this.set(response.data);          
        })
    }
}

