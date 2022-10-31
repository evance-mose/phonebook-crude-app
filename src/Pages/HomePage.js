import {useEffect, useState} from "react"
import {Link} from "react-router-dom";

export default function HomePage() {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [datas, setDatas] = useState([])
    const [filteredData,setFilteredData] = useState(datas);
      const URL = "http://127.0.0.1:8000/"

  async function fetchData(){
      fetch(URL).then((response) => response.json())
        .then((data) => { setDatas(data); setFilteredData(data);})}


    const deleteContact = async (id) => {
    await fetch(`http://127.0.0.1:8000/${id}`, {
      method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({"id":id})
    }).catch(err => console.log(err))
    await fetchData()
  }


  const handleSearch = (event) => {
  let value = event.target.value.toLowerCase();
  let result = [];
  console.log(value);
  result = datas.filter((data) => {
  return data.lastname.search(value) !== -1;
});
setFilteredData(result);
}
useEffect(()=>{
    fetchData()
    console.log(datas)
}, [])

  if (isLoaded)
    return <div className='text-2xl '>Loading...</div>
  return (
    <div className="">
    <div className='container mx-auto px-4 mt-8 '>
      <div className='flex items-center justify-between'>
        <div className="text-2xl font-semibold">Contacts</div>
        <div>
        <Link to="/create" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><span className="tex-3x text-white mr-5">+</span>Add Contact</Link>
        </div>
      </div>
      <div className="mt-8 mb-8">
      <div className="relative mt-3">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input  onChange={(event) =>handleSearch(event)}  className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700" placeholder="Search by last name..."/>
      </div>
      </div>
          {filteredData && filteredData.map((data)=>(
               <div className="space-y-8 bg-white border p-4 rounded-md">
              <div className="flex items-center justify-between" id={data.id}>
                  <div className="mt-2">
                      <div className="text-lg">{data.firstname+ " "+ data.lastname}</div>
                      <div className="flex items-center space-x-1">
                          <div>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" className="w-4 h-4 ">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                              </svg>
                          </div>
                          <div className="text-sm">{data.phone}</div>
                      </div>
                  </div>
                <div className="">
                  <button
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2"><Link to={`/edit/${data.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                    </svg>
                  </Link>
                  </button>
                  <button onClick={(e)=>deleteContact(data.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="#FFFF" className="w-4 h-4 ">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                      </svg>
                  </button>
                </div>
              </div>
                       </div>
          ))}

    </div>
    </div>

  )
}
