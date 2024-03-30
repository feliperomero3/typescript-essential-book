let hatPrice = 100;
console.log(`Hat price: ${hatPrice}`); // Hat price: 100
let bootsPrice = "100";
console.log(`Boots price: ${bootsPrice}`); // Boots price: 100

function sumPrices(...numbers) {
  return numbers.reduce(function(total, val) {
    return total + val
  }, 0);
}
let totalPrice = sumPrices(hatPrice, bootsPrice);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`); // Total: 1001000 string
totalPrice = sumPrices(100, 200, 300);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`); // Total: 600 number
totalPrice = sumPrices(100, 200);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`); // Total: 300 number
