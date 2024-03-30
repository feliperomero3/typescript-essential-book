let hatPrice = 100;
console.log(`Hat price: ${hatPrice}`); // Hat price: 100
let bootsPrice = "100";
console.log(`Boots price: ${bootsPrice}`); // Boots price: 100

function sumPrices(first, second, third) {
  return first + second + third;
}
let totalPrice = sumPrices(hatPrice, bootsPrice);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`); // Total: 100100undefined string
totalPrice = sumPrices(100, 200, 300);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`); // Total: 600 number
totalPrice = sumPrices(100, 200);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`); // Total: NaN number
// JavaScript coalesces 'undefined' to the special number value 'NaN'.
