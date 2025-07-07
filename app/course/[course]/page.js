//app/course/[course]/page.js 
import React from 'react'

function page({params}) {
const course = decodeURIComponent(params.course);

  return (
    <div>
        <h1>
           select the branch for {course}
        </h1>
      
    </div>
  )
}

export default page
