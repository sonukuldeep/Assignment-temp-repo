import { Route, Routes, Link } from "react-router-dom"
import { useRef, useState } from 'react'
import { BsMap, BsPinMap } from 'react-icons/bs';
import { MdOutlineContactEmergency } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineGithub } from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';
import Contacts from './components/Contacts';
import Maps from './components/Maps';
import Charts from './components/Charts';
import './App.css'


const App = () => {
  // hamburger and dropdown for smaller screens
  const [ishamburgerOpen, setIsHamburgerOpen] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)

  // this function handles dropdown btn click and handle navigation
  function handleHamburgerclick() {
    if (dropdown.current) {
      if (!ishamburgerOpen)
        dropdown.current.style.width = '28vw'
      else
        dropdown.current.style.width = '0vw'
      setIsHamburgerOpen(pre => !pre)
    }

  }
  return (
    <>
      <div className='py-2 bg-blue-500 shadow-lg'>
        <h1 className='text-center text-3xl capitalize font-semibold text-gray-300'>contact</h1>
      </div>

      <main className='flex min-h-[calc(100vh-52px)] border-t border-blue-600'>
        <div className='hidden md:block bg-gray-300 max-w-fit md:max-w-[200px] flex-1 md:border-r border-blue-500'>
          {/* links for each page in the website */}
          <Link to='/'><div className='flex items-center text-center md:border-b border-blue-500 text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><MdOutlineContactEmergency size="1.4em" className='mx-2' /><span className='hidden md:inline'>Contact</span></div></Link>
          <Link to='/charts'><div className='flex items-center text-center md:border-b border-blue-500 text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><BsMap size="1.4em" className='mx-2' /><span className='hidden md:inline'>Charts</span></div></Link>
          <Link to='/maps'><div className='flex items-center text-center md:border-b border-blue-500 text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><BsPinMap size="1.4em" className='mx-2' /><span className='hidden md:inline'>Maps</span></div></Link>
          <a href="https://github.com/sonukuldeep/Assignment-temp-repo" target="_blank" rel="noopener noreferrer"><div className='flex items-center text-center md:border-b border-blue-500 text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><AiOutlineGithub size="1.4em" className='mx-2' /><span className='hidden md:inline'>Link to my repo</span></div></a>
        </div>

        <div className="md:hidden z-10">
          <div className="" onClick={handleHamburgerclick}>
            <div className='cursor-pointer text-gray-100 absolute top-0 m-1'>
              <RxHamburgerMenu size='44' />
            </div>
            <div ref={dropdown} className="pages flex flex-col items-center overflow-hidden w-0 bg-gray-100 transition-all">
              {/* link to each page in the website for mobile devices */}
              <Link className='w-full border-r border-b border-blue-500' to='/'><div className='flex items-center text-center text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><MdOutlineContactEmergency size="1.4em" className='mx-2' /><span className='md:inline'>Contact</span></div></Link>
              <Link className='w-full border-r border-b border-blue-500' to='/charts'><div className='flex items-center text-center text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><BsMap size="1.4em" className='mx-2' /><span className='md:inline'>Charts</span></div></Link>
              <Link className='w-full border-r border-b border-blue-500' to='/maps'><div className='flex items-center text-center text-blue-500 hover:text-gray-300 hover:bg-blue-500 py-2 transition-all'><BsPinMap size="1.4em" className='mx-2' /><span className='md:inline'>Maps</span></div></Link>
            </div>
          </div>
        </div>

        <div className='flex-1'>
          {/* settig up all routes */}
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/Charts" element={<Charts />} />
            <Route path="/maps" element={<Maps />} />
          </Routes>
        </div>
        <Toaster position="bottom-center" />

      </main>
    </>
  )
}

export default App