let count = 5;
count = 10;

function add(a: number, b: number): number{
    return a + b;
}

const result = add(4, 5);

//type en js:  boolean, String, number, undefined, symbol, fonction, objet, bigint

//use let x: unknown    if you don't know the type of the value to be parsed

//use the or operator to assign either of two types example    x: string | number

function printValue(x: string | number){
    if(typeof x === "string"){
        console.log(x.toUpperCase())
    } else{
        console.log(x.toFixed())
    }
}