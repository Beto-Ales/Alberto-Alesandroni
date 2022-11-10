const Header = ({name}) => {

  return (

    <>

      <h1>Web development curriculum</h1>

      <h2>
        {name}
      </h2>

    </>
    
      
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

        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
          )}

      </ul>      
    
  )
}

const Course = ({name, parts}) => {
  
  

  const exercises = parts.map(part => part.exercises)
  
  const total = exercises.reduce( (a,b) => a+b )  

  return(
    <div>
      <Header name ={name}/>
      <Content parts={parts} />
      <p>Total of {total} exercises</p>
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <ul>
      {courses.map(course => 
        <Course key={course.id} name={course.name} parts={course.parts} />
        )}
    </ul>
  )
}

export default Courses