import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/src/assets/images/logo.png'
import { SlSocialFacebook, SlSocialInstagram, SlSocialPintarest } from 'react-icons/sl'

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-gray-600 body-font mt-16">
      <div className="container px-5 py-10 mx-auto flex md:items-start lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col justify-between">
        <div className="w-72 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link to='/' className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className='w-14 pr-2'>
              <img className='rounded-md w-full' 
                src={logo}
                alt='Assignment 1' 
              />
            </div>
            <span className="text-secondary text-2xl">Assignment 1</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">SIM Building 1461 Clementi Rd, Singapore 599491 <br/> Singapore, Singapore</p>
        </div>
        <div className=" flex flex-wrap sm:flex-nowrap md:pl-12 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="md:w-3/5 min-w-32 w-full px-2">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Categories</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Admins</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">About Us</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container py-4 px-5 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()}{" "} Assignment 1 by
            <a href="https://github.com/DarylTeh/CSIT314" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">ZZZ</a>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="ml-3 text-xl font-extrabold text-white p-2 bg-secondary shadow-lg rounded-lg">
              <SlSocialFacebook />
            </a>
            <a className="ml-3 text-xl font-extrabold text-white p-2 bg-secondary shadow-lg rounded-lg">
              <SlSocialInstagram />
            </a>
            <a className="ml-3 text-xl font-extrabold text-white p-2 bg-secondary shadow-lg rounded-lg">
              <SlSocialPintarest />
            </a>
            
          </span>
        </div>
      </div>
    </footer>
  )
}
