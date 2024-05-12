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

  return (
    <div>
      <Header header = {header} />
    </div>
  )
}

export default App