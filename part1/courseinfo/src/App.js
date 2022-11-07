const Header = ({name}) => {
  return (
      <h1>
        {name}
      </h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Content = ({parts}) => {
  return (
      <ul>
        {parts.map((part, id) =>
          <Part key={id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
  )
}

const Course = ({course}) => {
  const {name, parts} = course
  return(
    <div>
      <Header name ={name}/>
      <Content parts={parts} />
    </div>
  )
}

const App = ()=> {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  return <Course course={course} />
}

export default App;




// unicafe
// =======


// import React, { useState } from 'react'

// const Header = ({text}) => <h1>{text}</h1>

// const Button = ({handleClick, text}) => ( 

//     <button onClick={handleClick} >
//       {text}
//     </button>
  
// )

// const StatisticLine = ({text, value, symbol}) => {
//   return(
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <td>
//               <p>{text}</p>
//             </td>
//             <td>
//               <p>{value} {symbol}</p>
//             </td>
//           </tr>
//         </tbody>
//       </table>      
//     </div>
//   )
// }

// const Statistics = ({good, bad, neutral, total}) => {

//   const average = (good - bad) / total;
//   const positive = good / total * 100  

//   if(total > 0 ){
//     return(
//       <div>
//         <StatisticLine text="Good: " value ={good} />
//         <StatisticLine text="Neutral: " value ={neutral} />
//         <StatisticLine text="Bad: " value ={bad} />
//         <StatisticLine text="Total: " value ={total} />
//         <StatisticLine text="Average: " value ={average} />
//         <StatisticLine text="Positive: " value ={positive} symbol={'%'} />        
//       </div>
//     )
//   }
//   return(
//     <p>
//       No feedback given
//     </p>
//   )
  
// }

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)
//   const [total, setTotal] = useState(0)
  

//   const handleGood = () => {    
//     setGood(good + 1)
//     setTotal(total + 1)    
//   }

//   const handleNeutral = () => {
//     setNeutral(neutral + 1)
//     setTotal(total + 1)    
//   }

//   const handleBad = () => {
//     setBad(bad + 1)
//     setTotal(total + 1)    
//   }


//   return (
//     <div>
//       <Header text='Give feedback' />
//       <Button handleClick={handleGood} text='Good'/>
//       <Button handleClick={handleNeutral} text='Neutral'/>
//       <Button handleClick={handleBad} text='Bad'/>
//       <Header text='Statistics' />      
//       <Statistics good={good} bad={bad} neutral={neutral} total={total} />      
//     </div>
//   )
// }

// export default App




// anecdotes
// =========



// import React, { useState } from 'react'

// const MostVoted = ({ anecdotes, points }) => {  
//   let maxVote = points.indexOf(Math.max(...points))
  

//   return(
//     <p>
//       {anecdotes[maxVote]}
//     </p>
//   )  
// }

// const App = () => {
//   const anecdotes = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
//   ]

//   var ary = new Uint8Array(anecdotes.length);
   
//   const [selected, setSelected] = useState(0)

//   const [points, setPoints] = useState([...ary])

//   const getRandomInt = (min, max) => {
//     return Math.floor(Math.random() * (max - min)) + min;
//   }
  
//   function newSelected()  {
//     setSelected(getRandomInt(0, anecdotes.length))
//   }

//   function handleVote() {
//     const copy = [...points]
//     copy[selected] += 1
//     setPoints(copy)    
//   }

  
  
//   console.log(selected)
//   return (
//     <div>
//       <h1>Anecdote of the day</h1>
//       {anecdotes[selected]}<br/>
//       <button onClick={handleVote} >Vote</button>
//       <button onClick={newSelected} >Random phrase</button>      
//       <h1>Anecdote with most votes</h1>
//       <MostVoted anecdotes={anecdotes} points={points} />
//     </div>
//   )
// }

// export default App
