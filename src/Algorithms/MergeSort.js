export const getMergeSortAnimations = (nums) => {
  const copy = [...nums];
  const aux = Array(copy.length);
  const animations = [];
  mergeSortHelper(copy, aux, copy.length - 1, animations);
  return animations;
};

const mergeSortHelper = (arr, aux, left, right, animations) => {
  if (right <= left) return;
  const midPoint = left + Math.floor((right - left) / 2);
  mergeSortHelper(arr, aux, left, midPoint, animations);
  mergeSortHelper(arr, aux, midPoint + 1, right, animations);
  merge(arr, aux, left, midPoint, right, animations);
};

const merge = (arr, aux, left, midPoint, right, animations) => {
  for (let i = left; i <= right; i++) {
    aux[i] = arr[i];
  }
  let i = left;
  let j = midPoint + 1;
  for (let k = left; k <= right; k++) {
    if (i > midPoint) {
      animations.push([[j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else if (j > right) {
      animations.push([[i], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      animations.push([[i, j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else {
      animations.push([[i, j], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    }
  }
};
