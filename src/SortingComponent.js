import React from 'react'
import {bubbleSortHighlight, mergeSortHighlight, selectionSortHighlight} from './Algorithms'

const PRIMARY_COLOR = 'turquoise'
const SECONDARY_COLOR = 'yellow';

export default class SortingComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      array: []
    }
  }

  componentDidMount() {
    this.generateArray()
  }

  generateArray() {
    const new_Arr = []
    for (let i = 0; i < 100; i++) {
      new_Arr.push(Math.floor((Math.random() * 500) + 5))
    }
    this.setState({
      array: new_Arr
      // array: [300, 150, 60, 350, 200]
    })
  }


  mergeSort() {
    const highlightArr = mergeSortHighlight(this.state.array)
    for (let i = 0; i < highlightArr.length; i++) {
      const arrBars = document.getElementsByClassName('bar')
      const [swap, barOne, barTwo] = highlightArr[i]
      const isColorChange = i%3 !== 2
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR

      if (isColorChange) {
        setTimeout(() => {
          arrBars[barOne].style.backgroundColor = color
          arrBars[barTwo].style.backgroundColor = color
        }, i * 10)
      } else {
        setTimeout(() => {
          const [swap, barOne, heightOne, barTwo, heightTwo] = highlightArr[i]
          //RED: To highlight swap
          if (swap === true) {
            arrBars[barOne].style.backgroundColor = color
            arrBars[barTwo].style.backgroundColor = color
            arrBars[barOne].style.height = `${heightTwo}px`
            arrBars[barTwo].style.height = `${heightOne}px`
          //RED: No swap, but red highlight to show done
          } else if (swap === false) {
            arrBars[barOne].style.backgroundColor = color
            arrBars[barTwo].style.backgroundColor = color
            arrBars[barOne].style.height = `${heightOne}px`
            arrBars[barTwo].style.height = `${heightTwo}px`
          }
          else if (swap === 'remainder') {
            arrBars[barOne].style.backgroundColor = color
            arrBars[barOne].style.height = `${heightOne}px`
          }
        }, i * 10)
      }
    }
  }

  bubbleSort() {
    const highlightArr = bubbleSortHighlight(this.state.array)
    for (let i = 0; i < highlightArr.length; i++) {
      const arrBars = document.getElementsByClassName('bar')
      const [barOne, barTwo] = highlightArr[i]
      //YELLOW: To show two index comparisons
      const isColorChange = i%3 !== 2
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
      if (isColorChange) {
        setTimeout(() => {
          arrBars[barOne].style.backgroundColor = color
          arrBars[barTwo].style.backgroundColor = color
        }, i * 10)
      } else if (i%3 === 2) {
        setTimeout(() => {
          const [swap, barOne, heightOne, barTwo, heightTwo] = highlightArr[i]
          if (swap === true) {
            arrBars[barOne].style.backgroundColor = color
            arrBars[barTwo].style.backgroundColor = color
            arrBars[barOne].style.height = `${heightOne}px`
            arrBars[barTwo].style.height = `${heightTwo}px`
          }
        }, i * 10)
      }
    }
  }

  selectionSort() {
    const highlightArr = selectionSortHighlight(this.state.array)
    // console.log(highlightArr)
    for (let i = 0; i < highlightArr.length; i++) {
      const arrBars = document.getElementsByClassName('bar')
      const [swap, barOne, barTwo] = highlightArr[i]
      const color = i % 2 === 0 ?  PRIMARY_COLOR : SECONDARY_COLOR
      if (swap === false) {
        setTimeout(() => {
          arrBars[barOne].style.backgroundColor = color //'yellow'
          arrBars[barTwo].style.backgroundColor =  color //'red'
        }, i * 10)
      }

      else if (swap === true) {
        setTimeout(() => {
          const [swap, currIdx, currIdxHeight, smallestIdx, smallestIdxHeight] = highlightArr[i]
          arrBars[currIdx].style.backgroundColor = 'turquoise'
          arrBars[smallestIdx].style.backgroundColor = 'turquoise'
          arrBars[currIdx].style.height = `${smallestIdxHeight}px`
          arrBars[smallestIdx].style.height = `${currIdxHeight}px`
        }, i * 10)
      }
      // else if (swap === 'new') {
      //   const [swap, barOne] = highlightArr[i]
      //   arrBars[barOne].style.backgroundColor = 'red'
      // }
      arrBars[arrBars.length-1].style.backgroundColor = 'turquoise'
    }
  }

  render() {
    const {array} = this.state
    return (
      <div>
      <center style={{fontSize: 50}}>
      Sorting Algorithm Visualizer </center>
      <div className="array">
        {array.map((num, i) => (
            <div className="bar"
            key={i}
            style={{
              backgroundColor: 'turquoise',
              height: `${num}px`
            }}>
            </div>
          ))}
          <hr></hr>
          <center>
            <button type="submit" onClick={() => this.generateArray()}> Generate New Array </button>
            <button type="submit" onClick={() => this.bubbleSort()}> Bubble Sort </button>
            <button type="submit" onClick={() => this.selectionSort()}> Selection Sort </button>
            <button type="submit" onClick={() => this.mergeSort()}> Merge Sort </button>
          </center>
      </div>
      </div>
    )
  }
}



