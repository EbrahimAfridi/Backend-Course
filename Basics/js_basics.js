const arr = [1, 2, 3, 4, 5];
console.log(arr);

// forEach method: To do something with each element of an array
arr.forEach((value) => console.log(value + " hi"));

// map method: To create a new array with the results of calling a provided function on every element in the array
const mappedArr = arr.map((value) => value * 2);
console.log(mappedArr);

// filter method: To create a new array with all elements that pass the test implemented by the provided function
const filteredArr = arr.filter((value) => value > 2);
console.log(filteredArr);

// find method: To return the first element in the array that satisfies the provided testing function
const foundValue = arr.find((value) => value > 2);
console.log(foundValue);

// indexOf method: To return the first index at which a given element can be found in the array, or -1 if it is not present
const indexOfValue = arr.indexOf(13);
const indexOfValue2 = arr.indexOf(3);
console.log(indexOfValue);
console.log(indexOfValue2);

// Object 
const obj = {
  name: "John",
}
console.log(obj.name, obj['name']);

Object.freeze(obj); // Prevents the object from being modified
obj.name = "Jane";
console.log(obj.name);

function abc() {
  return 1;
}
const ans = abc();
console.log(ans);