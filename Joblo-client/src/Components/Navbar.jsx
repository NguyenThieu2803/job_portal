import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const navItem = [
    { path: "/", title: "Start a Search" },
    { path: "/my Job", title: "My Jobs" },
    { path: "/salary", title: "Salary" },
    { path: "/post-job", title: "Post A Job" },
  ]
  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <nav className='flex justify-between items-center py-6'>
        <a href='/' className='flex item-center gap-2 text-2x1 text-black' ><img src="images/tent.png" alt="logo" height={20} width={20} />Job Portal </a>

        {/* nav item */}
        <ul className='hidden md:flex gap-12'>
          {
            navItem.map(({ path, title }) => (
              <li key={path} className='text-base text-primary'>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))
          }
        </ul>

        {/* login and sign button-------------> */}
        <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
          <Link to="/login" className='py-2 px-5 border rounded'>Log In</Link>
          <Link to="/sign-up" className='py-2 px-5 border rounded bg-blue text-white'>Sign Up</Link>
        </div>

        {/* mobie menu */}
        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {
              isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />
            }
          </button>
        </div>
      </nav>

      {/* nav item for mobie */}
      <div>
        <ul className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
          {
            navItem.map(({ path, title }) => (
              <li key={path} className='text-base text-white first:text-white py-1'>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))
          }
          <li className='text-white py-1'><Link to="/login">Log In</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar