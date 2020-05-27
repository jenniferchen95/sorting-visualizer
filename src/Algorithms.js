export function selectionSortHighlight (arr) {
  const highlightArr = []
  let currIdx = 0
  while (currIdx < arr.length-1) {
    let smallestIdx = currIdx
    for (let i = currIdx + 1; i < arr.length; i++) {
      highlightArr.push([false, i, smallestIdx])
      highlightArr.push([false, i, smallestIdx])
      if (arr[i] < arr[smallestIdx]) smallestIdx = i
      // highlightArr.push(['new', smallestIdx])
    }
    highlightArr.push([true, currIdx, arr[currIdx], smallestIdx, arr[smallestIdx]])
    let temp = arr[smallestIdx]
    arr[smallestIdx] = arr[currIdx]
    arr[currIdx] = temp
    currIdx++
  }
  return highlightArr
}


//BUBBLE SORT
export function bubbleSortHighlight (arr) {
  const highlightArr = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length-1-i; j++) {
      //check all possible variations
      highlightArr.push([j, j+1])
      highlightArr.push([j, j+1])
      if (arr[j] >= arr[j+1]) {
        //if swap is trueeeee
        highlightArr.push([true, j+1, arr[j], j, arr[j+1]])
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      } else highlightArr.push([false, j, arr[j+1], j+1, arr[j]])
    }
  }
  return highlightArr
}
//------------------------------------------------------------------//

//ORIGINAL MERGESORT
// function merge(left, right) {
//   let sortedArr = []
//   while (left.length > 0 && right.length > 0) {
//     if (left[0] < right[0]) {
//       sortedArr.push(left.shift())
//     } else {
//       sortedArr.push(right.shift())
//     }
//   }
//   return sortedArr.concat(left.concat(right))
// }
// function mergeSort(arr) {
//   if (arr.length < 2) return arr
//   const middle = Math.floor(arr.length/2)
//   const left = arr.slice(0,middle);
//   const right = arr.slice(middle);

//   return merge(mergeSortHighlight(left), mergeSortHighlight(right))
// }

//------------------------------------------------------------------//

//BETTER MERGE SORT
//O(nlog(n)) time | O(n) space

export function mergeSortHighlight (arr) {
  const highlight = [];
  if (arr.length <= 1) return arr
  const dupArr = arr.slice()
  mergeSortHelper(arr, 0, arr.length-1, dupArr, highlight);
  return highlight
}

function mergeSortHelper(mainArr, startIdx, endIdx, dupArr, highlight) {
  if (startIdx === endIdx) return;
  const midIdx = Math.floor((startIdx+endIdx)/2)
  //DIVIDE ARRAY INTO TWO -> LEFT
  //SWAPPING AUX WITH MAIN ARRAY
  mergeSortHelper(dupArr, startIdx, midIdx, mainArr, highlight)
  //DIVIDE ARRAY INTO RIGHT
  mergeSortHelper(dupArr, midIdx + 1, endIdx, mainArr, highlight)
  merge(mainArr, startIdx, midIdx, endIdx, dupArr, highlight)
}


function merge(mainArr, startIdx, midIdx, endIdx, dupArr, highlight) {
  //aux array
  let k = startIdx;
  //start - mid
  let i = startIdx;
  //mid - end
  let j = midIdx + 1;
  while (i <= midIdx && j <= endIdx) {
    highlight.push(['highlight', i, j])
    highlight.push(['highlight', i, j])

    if (dupArr[i] <= dupArr[j]) {
      highlight.push([false, k, dupArr[i], j, dupArr[j]])
      // highlight.push([false, k, dupArr[i]])
      //main arr gets overwritten -> end
      //k index increments and also i index
      mainArr[k++] = dupArr[i++]
    } else {
      // highlight.push([true, k, dupArr[j], i, dupArr[i]])
      highlight.push([true, k, mainArr[k], j, dupArr[j]])
      mainArr[k++] = dupArr[j++]
    }
  }

  //TWO WHILE LOOPS FOR THE REMAINDER
  //FOR EITHER LEFT OR RIGHT SIDE STILL HAS REMAINDER
  while (i <= midIdx) {
    highlight.push(['remainder', i, i])
    highlight.push(['remainder', i, i])
    highlight.push(['remainder', k, dupArr[i]])
    mainArr[k++] = dupArr[i++]
  }

  while (j <= endIdx) {
    highlight.push(['remainder', j, j])
    highlight.push(['remainder', j, j])
    highlight.push(['remainder', k, dupArr[j]])
    mainArr[k++] = dupArr[j++]

  }
}


/* C
function merge(mainArr, startIdx, midIdx, endIdx, dupArr, highlight) {
  //aux array
  let k = startIdx;
  //start - mid
  let i = startIdx;
  //mid - end
  let j = midIdx + 1;
  while (i <= midIdx && j <= endIdx) {
    highlight.push([i, j])
    highlight.push([i, j])

    if (dupArr[i] <= dupArr[j]) {
      highlight.push([k, dupArr[i]])
      //main arr gets overwritten -> end
      //k index increments and also i index
      mainArr[k++] = dupArr[i++]
    } else {
      highlight.push([k, dupArr[j]])
      // highlight.push([true, k, dupArr[j]])
      mainArr[k++] = dupArr[j++]
    }
  }

  //TWO WHILE LOOPS FOR THE REMAINDER
  //FOR EITHER LEFT OR RIGHT SIDE STILL HAS REMAINDER
  while (i <= midIdx) {
    highlight.push([i, i])
    highlight.push([i, i])
    highlight.push([k, dupArr[i]])
    mainArr[k++] = dupArr[i++]
  }

  while (j <= endIdx) {
    highlight.push([j, j])
    highlight.push([j, j])
    highlight.push([k, dupArr[j]])
    mainArr[k++] = dupArr[j++]

  }
}
*/
