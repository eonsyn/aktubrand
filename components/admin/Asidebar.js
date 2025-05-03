import React from 'react'
import Link from 'next/link'
function Asidebar() {
  const asidemenu = [{
    'title':"home",
    'url':'/admin/dashboard'
  }]

  return (
    <aside className="  h-[80vh] w-40 sticky top-9">
      {/* Sidebar Content */}

      {asidemenu.map((item, index) => (
        <Link
        href={item.url}
        key={index}
        > <button className='w-full cursor-pointer bg-amber-200 py-1 text-xl mb-1 ' key={index}>{item.title}</button>
        </Link>
       
      ))}
    </aside>
  )
}

export default Asidebar
