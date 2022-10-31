import React, {useState} from 'react'
import axios from "axios";

function AddContactPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const URL = `http://127.0.0.1:8000/`


    const onSubmit = (e) => {
        e.preventDefault()
        if (firstName !== '' && lastName !== '' && phoneNumber !== ''){
            createContact().then(msg => alert("Contact added successfully") )
            setFirstName("")
            setLastName("")
            setPhoneNumber("")
        }else {
             alert("All fields are required")
        }

    }

   const createContact = async () => {
    await fetch(URL, {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({"firstname": firstName, "lastname":lastName, "phone": phoneNumber})
    }).catch(err => console.log(err))
  }


  return (
    <div className='container mx-auto p-4 mt-18'>
        <div className="text-2xl font-semibold">Add New Contact</div>
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
            <button type="submit" onClick={onSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600">Submit
            </button>
        </form>
    </div>
  )
}

export default AddContactPage