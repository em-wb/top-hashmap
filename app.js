// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

function hashMap() {
  let size = 16;
  const buckets = Array.from({ length: size }, () => []);
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
      buckets[bucketIndex].push = { key: key, value: value };
    }
    checkLoad();
  };

  const checkLoad = () => {
    let i = 0;
    let count = 0;
    let current = buckets[i];
    while (current) {
      if (!buckets[i].length === 0) {
        count++;
      }
      i++;
      current = buckets[i];
    }
    if (count >= size * loadFactor) {
      size = size * 2;
    }
    return size;
  };

  const get = (key) => {
    const hashCode = hash(key);
    const bucketIndex = hashCode % size;
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

  return { set, get };
}

const testMap = hashMap();
testMap.set("Anna", 46);
testMap.set("Jim", 23);
console.log("get", testMap.get("Anna"), testMap.get("Jim"));
