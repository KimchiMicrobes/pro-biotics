import type { NextPage } from 'next'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { fetchTableData } from './api/airtable-api'


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const Home: NextPage = () => {
  
  const [productData, setProductData] = useState(null)

  const setProductDateFromDB = async () => {
    const productDataFromDB = await fetchTableData()
    setProductData(productDataFromDB)
    console.log(productDataFromDB)
  }

  useEffect(()=>{
    setProductDateFromDB()
    return
  },[null])

  return (
    <div>
      {
          productData && productData.map((record) => (
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div className="shrink-0">
          <img className="h-12 w-12" src={record.fields['imgUrl']} alt="ChitChat Logo"/>
        </div>
        <div>
          <div className="text-xl font-medium text-black">{record.fields['제품명']}</div>
          <p className="text-slate-500">{record.fields['제조원']}</p>
        </div>
      </div>
      ))
    }
   </div> 
  )
}

export default Home
