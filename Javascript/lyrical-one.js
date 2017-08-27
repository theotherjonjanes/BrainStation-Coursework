
var a = ["Hi"];
var b = ["what?", "who?", "*chicka-chicka*"];
var c = ["My name is", "Eminem", "Slim Shady", "Marshall Mathers"];

// console.log(a);
// console.log(b);
// console.log(c);

console.log(a[0]);
b.forEach(function(entry) {
    console.log(c[0] +" "+ entry);
});
console.log(c[2]);
if (c[2]) {
    a.push("*mic drop*");
    console.log(a.pop());
    a.splice(0,a.length);
    b.splice(0,b.length);
    c.splice(0,c.length);
};

// console.log(a);
// console.log(b);
// console.log(c);