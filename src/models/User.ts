import { Sync } from './Sync'
import { Eventing } from './Eventing';
interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}
const rootUrl = 'http://localhost:3000/user';
//using composition we bring the instance of Eventing class into the User class
export class User {

    public events: Eventing = new Eventing();
    public sync:Sync<UserProps> = new Sync<UserProps>(rootUrl)
    
    constructor(private data:UserProps){}

  
   
}

