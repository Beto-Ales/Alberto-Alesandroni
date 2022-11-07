import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => ( 

    <button onClick={handleClick} >
      {text}
    </button>
  
)

const StatisticLine = ({text, value, symbol}) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <p>{text}</p>
            </td>
            <td>
              <p>{value} {symbol}</p>
            </td>
          </tr>
        </tbody>
      </table>      
    </div>
  )
}

const Statistics = ({good, bad, neutral, total}) => {

  const average = (good - bad) / total;
  const positive = good / total * 100  

  if(total > 0 ){
    return(
      <div>
        <StatisticLine text="Good: " value ={good} />
        <StatisticLine text="Neutral: " value ={neutral} />
        <StatisticLine text="Bad: " value ={bad} />
        <StatisticLine text="Total: " value ={total} />
        <StatisticLine text="Average: " value ={average} />
        <StatisticLine text="Positive: " value ={positive} symbol={'%'} />        
      </div>
    )
  }
  return(
    <p>
      No feedback given
    </p>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  

  const handleGood = () => {    
    setGood(good + 1)
    setTotal(total + 1)    
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)    
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)    
  }


  return (
    <div>
      <Header text='Give feedback' />
      <Button handleClick={handleGood} text='Good'/>
      <Button handleClick={handleNeutral} text='Neutral'/>
      <Button handleClick={handleBad} text='Bad'/>
      <Header text='Statistics' />      
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />      
    </div>
  )
}

export default App