import React from 'react'

export default function Footer() {
    let year = new Date().getFullYear();
  return (
    <footer className='bg-primary text-white py-2'>
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="text-center m-0">&copy; {year}. All Right Reserved. Developed by Ijjaz Ahmad</p>
                </div>
            </div>
        </div>
    </footer>
  )
}
