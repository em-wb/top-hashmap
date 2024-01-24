// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

function hashMap() {
  let size = 16;
  let buckets = Array.from({ length: size }, () => []);
  const loadFactor = 0.75;

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  };

  const set = (key, value) => {
    const hashCode = hash(key);
    const bucketIndex = hashCode % size;
    if (buckets[bucketIndex].length === 0) {
      buckets[bucketIndex].push({ key: key, value: value });
    } else {
      let i = 0;
      let current = buckets[bucketIndex][i];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        i++;
        current = buckets[bucketIndex][i];
      }
      buckets[bucketIndex].push({ key: key, value: value });
    }
    checkLoad();
  };

  let checkLoad = () => {
    let i = 0;
    let count = 0;
    let current = buckets[i];
    while (current) {
      if (current.length > 0) {
        count += current.length;
      }
      i++;
      current = buckets[i];
    }
    if (count >= size * loadFactor) {
      size = size * 2;
      rehashEntries();
    }
    return size;
  };

  const rehashEntries = () => {
    const originalCheckLoad = checkLoad;
    checkLoad = () => {};
    const oldBuckets = [...buckets];
    buckets = Array.from({ length: size }, () => []);
    for (const oldBucket of oldBuckets) {
      for (const entry of oldBucket) {
        if (entry) {
          set(entry.key, entry.value);
        }
      }
    }
    checkLoad = originalCheckLoad;
  };

  const get = (key) => {
    const hashCode = hash(key);
    const bucketIndex = hashCode % size;
    if (bucketIndex < 0 || bucketIndex >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let i = 0;
    const current = buckets[bucketIndex][i];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      i++;
      current = buckets[bucketIndex][i];
    }
    return null;
  };

  const has = (key) => {
    const hashCode = hash(key);
    const bucketIndex = hashCode % size;
    if (bucketIndex < 0 || bucketIndex >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let i = 0;
    const current = buckets[bucketIndex][i];
    while (current) {
      if (current.key === key) {
        return true;
      }
      i++;
      current = buckets[bucketIndex][i];
    }
    return false;
  };

  const remove = (key) => {
    const hashCode = hash(key);
    const bucketIndex = hashCode % size;
    if (bucketIndex < 0 || bucketIndex >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let i = 0;
    const current = buckets[bucketIndex][i];
    while (current) {
      if (current.key === key) {
        buckets[bucketIndex].splice(i, 1);
        return true;
      }
      i++;
      current = buckets[bucketIndex][i];
    }
    return false;
  };

  const length = () => {
    let i = 0;
    let count = 0;
    let current = buckets[i];
    while (current) {
      if (current.length > 0) {
        count += current.length;
      }
      i++;
      current = buckets[i];
    }
    return count;
  };

  const clear = () => {
    let size = 16;
    buckets = Array.from({ length: size }, () => []);
    return true;
  };

  const keys = () => {
    const keysArray = [];
    let i = 0;
    let current = buckets[i];
    while (current) {
      let i2 = 0;
      while (current[i2]) {
        if (current[i2].key) {
          keysArray.push(current[i2].key);
        }
        i2++;
      }
      i++;
      current = buckets[i];
    }
    const arrayToString = keysArray.join(", ");
    return arrayToString;
  };

  const values = () => {
    const valuesArray = [];
    let i = 0;
    let current = buckets[i];
    while (current) {
      let i2 = 0;
      while (current[i2]) {
        if (current[i2].value) {
          valuesArray.push(current[i2].value);
        }
        i2++;
      }
      i++;
      current = buckets[i];
    }
    const arrayToString = valuesArray.join(", ");
    return arrayToString;
  };

  const entries = () => {
    const entriesArray = [];
    let i = 0;
    let current = buckets[i];
    while (current) {
      let i2 = 0;
      while (current[i2]) {
        if (current[i2].value) {
          entriesArray.push(current[i2]);
        }
        i2++;
      }
      i++;
      current = buckets[i];
    }
    return entriesArray;
  };

  return { set, get, has, remove, length, clear, keys, values, entries };
}

//create hashmap
const testMap = hashMap();
testMap.set("Anna", 46);
testMap.set("Jim", 23);

//test methods
console.log("get Anna", testMap.get("Anna")),
  console.log("has Jim:", testMap.has("Jim"));
console.log(
  "remove Jim:",
  testMap.remove("Jim"),
  "has Jim:",
  testMap.has("Jim")
);
console.log("length", testMap.length());
console.log("clear", testMap.clear());
console.log("length", testMap.length());

testMap.set("Anna", 46);
testMap.set("Jim", 23);

console.log("keys", testMap.keys());
console.log("values", testMap.values());
console.log("entries", testMap.entries());

testMap.set("Alice", 30);
testMap.set("Bob", 28);
testMap.set("Eva", 25);
testMap.set("Daniel", 22);
testMap.set("Grace", 27);
testMap.set("John", 29);
testMap.set("Lily", 31);
testMap.set("Mike", 26);
testMap.set("Olivia", 24);
testMap.set("Tom", 32);
testMap.set("Sophia", 33);
testMap.set("Chris", 35);
testMap.set("Emma", 21);
testMap.set("Ryan", 34);

console.log("entries", testMap.entries());
