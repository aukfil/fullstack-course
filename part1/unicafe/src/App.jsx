import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
    <h1>{props.header}</h1>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header = 'give feedback'

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <Header header = {header} />
      <div>
        <button onClick = {() => setGood(good + 1)}> good </button>
        <button onClick = {() => setNeutral(neutral + 1)}> neutral </button>
        <button onClick = {() => setBad(bad + 1)}> bad </button>
      </div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App