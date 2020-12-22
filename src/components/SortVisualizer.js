import { useState, useEffect, useRef } from "react";
import { getMergeSortAnimations } from "../Algorithms/MergeSort";
import { getInsertionSortAnimations } from "../Algorithms/InsertionSort";
import { getQuickSortAnimations } from "../Algorithms/QuickSort";
import "./styles.css";

const LENGTH = 100;
const MIN = 5;
const MAX = 80;
const DELAY = 5;
const ACTIVE_COLOR = "turqoise";
const SORTED_COLOR = "green";

const SortVisualizer = () => {
  const [nums, setNums] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  const resetColors = () => {
    const bars = containerRef.current.children;
    for (let i = 0; i < nums.length; i++) {
      const barStyle = bars[i].style;
      barStyle.backgroundColor = "";
    }
  };

  const randomize = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      const randomIdx = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[randomIdx];
      arr[randomIdx] = temp;
    }
  };

  const generateNums = () => {
    if (isSorting) {
      return;
    } else if (isSorted) {
      resetColors();
    }
    setIsSorted(false);
    const nums = [];
    for (let i = 0; i < LENGTH; i++) {
      nums.push((MAX - MIN) * (i / LENGTH) + MIN);
    }
    randomize(nums);
    setNums(nums);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => generateNums, []);

  const animateNumAccess = (idx) => {
    const bars = containerRef.current.children;
    const barStyle = bars[idx].style;
    setTimeout(() => {
      barStyle.backgroundColor = ACTIVE_COLOR;
    }, DELAY);
    setTimeout(() => {
      barStyle.backgroundColor = "";
    }, DELAY * 2);
  };

  const animateSortedNums = () => {
    const bars = containerRef.current.children;
    for (let i = 0; i < bars.length; i++) {
      const barStyle = bars[i].style;
      setTimeout(() => {
        barStyle.backgroundColor = SORTED_COLOR;
      }, i * DELAY);
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, (bars.length * DELAY) / 2);
  };

  const animateNumsUpdate = (animations) => {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], idx) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateNumAccess(i);
            animateNumAccess(j);
          } else {
            const [i] = comparison;
            animateNumAccess(i);
          }
        } else {
          setNums((prevNums) => {
            const [k, newVal] = comparison;
            const newNums = [...prevNums];
            newNums[k] = newVal;
            return newNums;
          });
        }
      }, idx * DELAY);
    });
    setTimeout(() => {
      animateSortedNums();
    }, animations.length * DELAY);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(nums);
    animateNumsUpdate(animations);
  };

  const insertionSort = () => {
    const animations = getInsertionSortAnimations(nums);
    animateNumsUpdate(animations);
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(nums);
    animateNumsUpdate(animations);
  };

  return (
    <div className="visualizer-container">
      <div className="bars-container" ref={containerRef}>
        {nums.map((barHeight, idx) => (
          <div
            className="bar"
            style={{
              height: `${barHeight}vmin`,
              width: `${100 / LENGTH}vw`,
            }}
            key={idx}
          />
        ))}
      </div>
      <div className="button-container">
        <button className="button" onClick={generateNums}>
          Create New List
        </button>
        <button className="button" onClick={mergeSort}>
          Merge Sort
        </button>
        <button className="button" onClick={insertionSort}>
          Insertion Sort
        </button>
        <button className="button" onClick={quickSort}>
          Quick Sort
        </button>
      </div>
    </div>
  );
};

export default SortVisualizer;
