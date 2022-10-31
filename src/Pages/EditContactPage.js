import React, {useEffect, useState,} from 'react'
import { useParams, } from 'react-router';

function EditContactPage() {
    const {id} = useParams()
    const [data, setData] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const URL = `http://127.0.0.1:8000/${id}`

    async function fetchData(){
      fetch(URL).then((response) => response.json())
        .then((res) => { setFirstName(res.firstname); setLastName(res.lastname); setPhoneNumber(res.phone)})}

    useEffect(()=>{
        fetchData().then(res => setFirstName(res.phone))

    }, [])

       const updateContact = async () => {
        await fetch(URL, {
          method: "UPDATE",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({"firstname": firstName, "lastname":lastName, "phone": phoneNumber})
        }).catch(err => console.log(err))
      }

        const onUpdate = (e) => {
            e.preventDefault()
            if (firstName !== '' && lastName !== '' && phoneNumber !== ''){
                updateContact().then(msg => alert("Contact updates successfully") )

            }
        }


  return (
    <div className='container mx-auto p-4 mt-18'>
        <div className="text-2xl font-semibold">Edit Contact</div>
        <form className="mt-8">
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
            <input type="text"  value={firstName} onChange={event => setFirstName(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="enter first name" required/>
        </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="enter last name" required/>
            </div>
            <div className="mb-6 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                <input type="text" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" placeholder="enter phone number" required/>
            </div>
            <button type="submit" onClick={onUpdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600">Submit
            </button>
        </form>
    </div>
  )
}

export default EditContactPage