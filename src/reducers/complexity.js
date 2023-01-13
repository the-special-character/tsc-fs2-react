const arr = [1, 2, 3, 4, 5];

const searchItem = 4;

// O(1) -> best compexity
let result = false;

const length = Math.floor(arr.length / 2);

if (arr[length] === searchItem) {
  result = true;
}

console.log(arr[length]);
if (arr[length] > searchItem) {
}

if (arr[length] < searchItem) {
}

console.log(result);

// O(N) -> average
// O(logN) -> second best compexity

for (let i = 0; i < arr.length; i++) {
  console.log(i);
  const element = arr[i];
  if (element === 3) {
    result = true;
    break;
  }
}

console.log(result);
