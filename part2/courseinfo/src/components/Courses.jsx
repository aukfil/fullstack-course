const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ exercises }) => {
  return (
    <p>
      <b>Number of exercises {exercises.reduce((acc, val) => acc + val, 0)}</b>
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total exercises = {course.parts.map(part => part.exercises)} />
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default Courses