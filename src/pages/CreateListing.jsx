import React, { useState } from 'react'
import Spinner from "../components/Spinner"
import { toast } from 'react-toastify';

export default function CreateListing() {
    const [loading, setLoading] = useState(false)
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
        images: {},

    });
    const {type, 
        name, 
        bedrooms, 
        bathrooms,
        parking, 
        furnished, 
        address, 
        description, 
        offer,
        regularPrice,
        discountedPrice,
        latitude,
        longitude,
        images
    } = formData;
    function onChange(e){
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }

        // FILES
        if(e.target.files){
            setFormData((prevState)=> ({
                ...prevState,
                images: e.target.files
            }));
        }
        // STRING/BOOL/NUMBER
        if(!e.target.files){
            setFormData((prevState)=> ({
                ...prevState,
                // rah null de mandray anle e.target.value fa rah ts null kosa de mandray zay valeurany(true/false)
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        if(regularPrice <= discountedPrice){
            setLoading(false);
            toast.error("Discounted price needs to be less than regular price !");
            return;
        }

        if(images.length > 6){
            setLoading(false);
            toast.error("Maximun 6 images are alowed!");
            return;
        }

        let geolocation = {}
        let location
        if(geolocationEnabled){

        }
    }
    if(loading){
        return <Spinner/>;
    }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-center text-3xl mt-6 font-bold'>Create a Listing</h1>

        <form onSubmit={onSubmit}>

            {/* SELL/RENT BUTTON */}
            <p className='text-lg mt-6 font-semibold'>Sell/rent</p>
            <div className='flex justify-center items-center'>
                {/* SELL BUTTON */}
                <button className={`mr-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${type === "rent" ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='type' value="sale" onClick={onChange}>sell</button>


                {/* RENT BUTTON */}
                <button className={`ml-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${type === "sale" ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='type' value="rent" onClick={onChange}>rent</button>
            </div>

            {/* NAME INPUT */}
            <p className='text-lg mt-6 font-semibold'>Name</p>
            <input type="text" id='name' value={name} onChange={onChange} placeholder='Name' maxLength="32" minLength="10" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 ' />

            {/* BED/BATH ROOMS INPUT */}
            <div className="flex justify-start items-center gap-7">
                {/* Bedrooms */}
                <div>
                    <p className='text-lg font-semibold'>Beds</p>
                    <input type="number" name="" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="50" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 '/>
                </div>

                {/* Bathrooms */}
                <div>
                    <p className='text-lg font-semibold'>Baths</p>
                    <input type="number" name="" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="50" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 '/>
                </div>
            </div>

            {/* PARKING SPOT BUTTON */}
            <p className='text-lg font-semibold'>Parking spot</p>
            <div className='flex justify-center items-center mb-6'>
                {/* YES BUTTON */}
                <button className={`mr-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${!parking ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='parking' value={true} onClick={onChange}>yes</button>


                {/* NO BUTTON */}
                <button className={`ml-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${parking ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='parking' value={false} onClick={onChange}>no</button>
            </div>

                {/* FURNISHED BUTTON */}
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className='flex justify-center items-center mb-6'>
                {/* YES BUTTON */}
                <button className={`mr-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${!furnished ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='furnished' value={true} onClick={onChange}>yes</button>


                {/* NO BUTTON */}
                <button className={`ml-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${furnished ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='furnished' value={false} onClick={onChange}>no</button>
            </div>

            {/* ADRESS INPUT */}
            <p className='text-lg mt-6 font-semibold'>Address</p>
            <textarea type="text" id='address' value={address} onChange={onChange} placeholder='Address' required className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 ' />

            {!geolocationEnabled && (
                <div className="w-full flex justify-center items-center space-x-6 mb-6">
                    <div className="w-full">
                        <p className='font-semibold font-sm '>Latitude</p>
                        <input 
                        type="number" 
                        id="latitude" 
                        value={latitude} 
                        onChange={onChange} 
                        required 
                        min="-90" 
                        max="90" 
                        className='w-full px-7 text-center py-3 rounded bg-white border focus:border-gray-700 focus:bg-white '/>
                    </div>
                    <div className="w-full">
                        <p className='font-semibold font-sm '>Longitude</p>
                        <input type="number" id="longitude" value={longitude} onChange={onChange} required min="-180" max="180" className='w-full px-7 text-center py-3 rounded bg-white border focus:border-gray-700 focus:bg-white '/>
                    </div>
                </div>
            )}

             {/* DESCRIPTION INPUT */}
             <p className='text-lg font-semibold'>Description</p>
            <textarea type="text" id='description' value={description} onChange={onChange} placeholder='Description' required className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 ' />

            {/* OFFER BUTTON */}
            <p className='text-lg font-semibold'>Offer</p>
            <div className='flex justify-center items-center mb-6'>
                {/* YES BUTTON */}
                <button className={`mr-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${!offer ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='offer' value={true} onClick={onChange}>yes</button>


                {/* NO BUTTON */}
                <button className={`ml-3 w-full bg-white px-7 py-3 uppercase font-semibold text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${offer ? "bg-white text-black " : "bg-gray-600 text-white"}`} type="button" id='offer' value={false} onClick={onChange}>no</button>
            </div>
            <div className="flex items-center mb-6">
                    <div className="">
                        <p className='text-lg font-semibold'>Regular price</p>
                        <div className="flex w-full justify-center items-center space-x-6">
                            <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} min="50" max="400000000" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 '/>
                            
                        {type === "rent" && (
                                <div>
                                    <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                                </div>
                        )}
                        </div>
                    </div>
            </div>

            {offer === true && (
                    <div className="flex items-center mb-6">
                        <div className="">
                            <p className='text-lg font-semibold'>Discounted price</p>
                            <div className="flex w-full justify-center items-center space-x-6">
                                <input type="number" id="discountedPrice" value={discountedPrice} onChange={onChange} min="50" max="400000000" required={offer} className='w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 '/>
                            </div>
                        </div>
                    </div>
            )}

            <div className="mb-6">
                <p className='text-lg font-semibold '>Images</p>
                <p className='text-gray-600'>The first images will be the cover (max 6)</p>
                <input type="file" id="images" onChange={onChange} accept='.jpg,.jpeg,.png' multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out rounded focus:bg-white focus:border-slate-600'/>
            </div>

            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Create Listing</button>
        </form>
    </main>
  )
}
