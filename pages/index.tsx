import type { NextPage } from 'next'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { fetchTableData } from './api/airtable-api'
import { SearchIcon } from '@heroicons/react/outline'

// typescript

type Nullable<T> = T | null;

interface productData {
  fields: {
    imgUrl: string;
    productName: string;
    manufacture: string;
  }
}

interface Props {
  product: productData,
  idx: number,
}


const types = ['유산균', '오은영박사의', '박재현추천', '손명균인증', '박재현 비추천', '절대 먹지 마시오', '설사 특화']

const Home: NextPage = () => {

  const [productDatas, setProductData] = useState<Nullable<productData[]>>(null)
  const [filterTypes, setFilterTypes] = useState(new Set())
  const [searchText, setSearchText] = useState('')

  const setProductDataFromDB = async () => {
    const productDataFromDB = await fetchTableData()
    setProductData(productDataFromDB)
  }

  const getSearchedProductDatas = (data:productData[]) => {
    // searchText를 state에서 불러오고, 그 값으로 data filtering 하기. 
    const filteredSearchDatas = data?.filter((productData) => productData.fields.productName?.includes(searchText))
    return filteredSearchDatas
  }

  const getFilteredProductDatas = (data:productData[]) => {
    if(filterTypes.size ===0) {
      return data

    } else {
      const filteredProductDatas = data?.filter((productData) => {
        let isIncluded = false
  
        filterTypes.forEach((value) => {
          if (productData.fields.productName?.includes(value)) {
            isIncluded = true
          }
        })
  
        return isIncluded
      })
      return filteredProductDatas
    }
  }


  const getFilteredSearchedData = () => {
    let filteredSearchedData = []

    const searchedProductDatas = getSearchedProductDatas(productDatas) 
    if(searchedProductDatas.length > 0){
      filteredSearchedData = getFilteredProductDatas(searchedProductDatas)
    }
    return filteredSearchedData
  }


  const setFilterType = (type) => {
    let newFilterTypes = new Set(filterTypes)
    if (newFilterTypes.has(type)) {
      newFilterTypes.delete(type)
    } else {
      newFilterTypes.add(type)
    }
    setFilterTypes(newFilterTypes)
    console.log(newFilterTypes)
  }



  {/*p-6 max-w-sm mx-auto rounded-xl shadow-lg flex space-x-4 bg-white items-center */ }

  const ProductCard = (props: Props) => (

    <div key={props.idx} className="p-6 max-w-md mx-auto border-2 rounded-xl shadow-xl flex space-x-4 bg-white items-center">
      <div className="shrink-0">
        <img className="h-12 w-12" src={props.product.fields.imgUrl} alt="ChitChat Logo" />
      </div>
      <div>
        <div className="text-xl font-medium text-black">{props.product.fields.productName}</div>
        <p className="text-slate-500">{props.product.fields.manufacture}</p>
      </div>

    </div>
  )

  {/*ES6 javascript function 문법 참고*/ }
  const FilterType = (props) => (
    /* 일반 javascript function의 paramter와  JSX의 props를 비교해서 공부하기 */
    /* ? : 문법 확인하기*/
    < div onClick={() => { setFilterType(props.type) }}
      className={`m-1 p-1 border-2 rounded-2xl ${filterTypes.has(props.type) ? 'border-cyan-500' : 'border-500'} `} >
      {props.type}
    </div >
  )


  useEffect(() => {
    setProductDataFromDB()
    return
  }, [null])

  return (
    <div>
      {/* 로고 & 서치 바 */}
      <div className='flex w-full h-12 bg-sky-400'>
        <div className='w-1/5 h-full bg-white items-center'>
          <img
            className=' w-12 h-full mx-auto'
            src={'https://play-lh.googleusercontent.com/5vrrZzL4jKg4Rs_SdGL9MuQbmxI1EmpQW9fuDMzY7N5-UuvMtJ1a4Kten6exClZSMfBH'} />
        </div>
        <div className='flex w-4/5 h-full bg-white items-center justify-center '>
          <div className='flex justify-end bg-white border-2 p-1'>
            <input id={'searchInput'} className='focus:outline-none' />
            <div onClick={()=>{setSearchText(document.getElementById("searchInput")?.value)}} className='w-6 h-full flex items-center'>
              <SearchIcon className='text-blue-400 w-5 h-5' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex py-2 bg-blue items-center justify-center flex-wrap'>
        {types.map((type) => <FilterType type={type} />)}

      </div>
      {/* 로고 & 서치 바 */}
      {
        productDatas && getFilteredSearchedData()?.map((productData, idx) =>
          <ProductCard product={productData} idx={idx} />)
      }
    </div>
  )
}

export default Home
