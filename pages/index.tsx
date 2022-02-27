import type { NextPage } from 'next'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const Home: NextPage = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div className="shrink-0">
      <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo"/>
    </div>
    <div>
      <div className="text-xl font-medium text-black">ChitChat</div>
      <p className="text-slate-500">You have a new message!</p>
    </div>
  </div>
  )
}

export default Home
