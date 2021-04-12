//Define an interface that contracts the properties for a User object
import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}
//using composition we bring the instance of Eventing class into the User class
export class User {

    public events: Eventing = new Eventing();
    
    constructor(private data:UserProps){}

    get(propName: string): string|number {
        return this.data[propName]
    }
    set(update:UserProps): void {
        Object.assign(this.data,update);
    }
   

    fetch():void {
        axios.get(` http://localhost:3000/user/${this.get('id')}`).then(
            (response: AxiosResponse) => {
                this.set(response.data)
            }
        )
    }

    save(): void {        
        const id = this.get('id');
        if (id) {
            axios.put(`http://localhost:3000/user/${id}`, this.data)
        } else {
            axios.post('http://localhost:3000/user', this.data)
        }        
    }
}

