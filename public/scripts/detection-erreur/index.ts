export type User = {
    username: string;
}

const values = [1, 2, 3, 4, 5, 6];

if(values.length > 2){
    console.log("Array has more than two items");
} else{
    console.log("Array has two items or less");
}

function greet(user: User){
    return "Hello "+user.username.toUpperCase();
}

const user: User = {username: "Yann"};
greet(user);