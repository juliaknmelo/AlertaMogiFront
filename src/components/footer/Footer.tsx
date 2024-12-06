import React from 'react'

function Footer() {
 



  // eslint-disable-next-line prefer-const
  let data = new Date().getFullYear()


   

  return (
    <>
      <>
        <div className="flex justify-center h-full text-black ">
          <div className="container flex flex-col items-center ">
            <p className='text-xl font-bold'>Avisa Mogi | Copyright: {data}</p>
            <div className='flex gap-2'>
      
            </div>
          </div>
        </div>
      </>
     
    </>
  )
}

export default Footer