import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
    <h1>{props.name}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick = {() => props.setter(props.state + 1)}>
      {props.name}
    </button>
  )
}

const StatisticLine = (props) => {
  return(
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  const good = props.states[0]
  const neutral = props.states[1]
  const bad = props.states[2]
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100 + '%'

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>All</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{average.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{positive}</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'Give feedback'
  const section = 'Statistics'
  const buttons = ['good', 'neutral', 'bad']
  const states = [good, neutral, bad]
  const setters = [setGood, setNeutral, setBad]

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <Header name = {title} />
      <Button name = {buttons[0]} state = {states[0]} setter = {setters[0]} />
      <Button name = {buttons[1]} state = {states[1]} setter = {setters[1]} />
      <Button name = {buttons[2]} state = {states[2]} setter = {setters[2]} />
      <Header name = {section} />
      <Statistics states = {states} />
    </div>
  )
}

export default App