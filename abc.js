function intersect(arr1, arr2) {
  const obj = {};
  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    let count = 1;
    console.log("key ", obj[arr1[i]]);
    // obj[arr1[i]] returns value of the key arr1[i] : if arr[i] = 1 then, obj[arr1[i]] => obj[1] which means what is the value of key 1 in obj
    if (obj[arr1[i]]) {
      obj[arr1[i]] = count++;
    }
    obj[arr1[i]] = count;
  }

  console.log(obj);

  for (let j = 0; j < arr2.length; j++) {
    if (obj[arr2[j]]) {
      result.push(arr2[j]);
      // console.log(`value of ${arr2[j]} before: `, obj[arr2[j]]);
      obj[arr2[j]] = obj[arr2[j]] - 1;
      // console.log(`value of ${arr2[j]} after: `, obj[arr2[j]]);
    }
  }

  return result;
}

const ans = intersect([1, 2, 2, 3, 4, 4], [2, 2, 4, 2000]);
console.log(ans);
