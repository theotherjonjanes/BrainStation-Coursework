var energy = (); // Enter your energy level, out of 5, in the ()
var me = [];

if (energy < 1) {
    me.push("coffee!");
    console.log("Have a" +" "+me.pop());
}
else if (energy <= 3) {
for (var i = 0; i <= energy; i++) {
    me.push("coffee");
    console.log("Have a" +" "+me[i]+".");
};
console.log(me.length +" "+ me.pop()+"s!");
console.log("Much better!");
}
else if (energy <= 4) {
    me.push("coffee");
    console.log("Have maybe one more" +" "+me+"?");
} 
else {
    console.log("Pay attention!");
};