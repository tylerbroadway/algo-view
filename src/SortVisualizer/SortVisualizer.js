import { useState, useEffect, useRef } from "react";
import "./styles.css";

const LENGTH = 100;
const MIN = 5;
const MAX = 80;
const DELAY = 5;
const ACTIVE_COLOR = "turqoise";
const SORTED_COLOR = "green";

const SortVisualizer = (props) => {
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

  useEffect(() => generateNums, []);

  return (
    <div>
      <h1>I'm sorting stuff</h1>
    </div>
  );
};

export default SortVisualizer;
