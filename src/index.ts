import { User } from './models/User';

const user = new User({ name: "Peter", age: 52 });

user.events.on('change',() => {
    console.log('Change event is triggered');
});

user.events.trigger('change');
