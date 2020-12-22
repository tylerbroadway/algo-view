import { swap } from "./Utility";

export const getQuickSortAnimations = (arr) => {
  const copy = [...arr];
  const animations = [];
  quickSortHelper(copy, 0, copy.length - 1, animations);
  return animations;
};

const quickSortHelper = (arr, left, right, animations) => {
  if (right <= left) return;
  const part = partition(arr, left, right, animations);
  quickSortHelper(arr, left, part, animations);
  quickSortHelper(arr, part + 1, right, animations);
};

const partition = (arr, left, right, animations) => {
  let i = left;
  let j = right + 1;
  const pivot = arr[left];

  while (true) {
    while (arr[++i] <= pivot) {
      if (i === right) break;
      animations.push([[i], false]);
    }

    while (arr[--j] >= pivot) {
      if (j === left) break;
      animations.push([[j], false]);
    }

    if (j <= i) break;
    animations.push([[i, arr[j]], true]);
    animations.push([[j, arr[i]], true]);
    swap(arr, i, j);
  }

  animations.push([[left, arr[j]], true]);
  animations.push([[j, arr[left]], true]);
  swap(arr, left, j);
  return j;
};
