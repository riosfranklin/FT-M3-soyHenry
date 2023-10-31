const sumArray = (array, n) => {
  if (!Array.isArray(array)) throw new TypeError(`${array} is not a Array`);
  if (typeof n !== "number") throw new TypeError(`${n} is not a Number`);
  for (var i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === n) return true;
    }
  }
  return false;
};

const numString = (aux) => {
  if (typeof aux !== "string") throw new TypeError(`${aux} must be a String`);
};
// var array = [2, 5, 7, 10, 11, 15, 20];
// var num = 13;
// console.log(sumArray(array, num));

// console.log(numString(13));

module.exports = {
  sumArray,
};
