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
        <button> good {good}</button>
        <button> neutral {neutral}</button>
        <button> bad {bad}</button>
      </div>
      <h1>statistics</h1>
      <div>good</div>
      <div>neutral</div>
      <div>bad</div>
    </div>
  )
}

export default App