import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { collection, doc, getDocs, orderBy, query, updateDoc, where, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase'
import { FcHome } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName, 
    email: auth.currentUser.email, 
  });
  const {name, email} = formData

  function onChange(e){
    setFormData((prevState)=>({ 
      ...prevState, 
      [e.target.id]: e.target.value, 
    }));
  }
  function logOut(){
    auth.signOut()
    navigate("/")
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.name !== name){
        // Update displayName in firebase authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update the name in Firestore
        const docRef = doc(db, "users", auth.currentUser.uid)

        await updateDoc(docRef, {name})
      };
      toast.success("Profile details Updated")
      
    } catch (error) {
      toast.error("Could not update the profile detail")
    }
  }

  useEffect(()=>{
    async function fetchUserListings(){
      const listingRef = collection(db, "listings");
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);  
      setLoading(false);

    }
    fetchUserListings();
  }, [auth.currentUser.uid]);  
  
  async function onDelete(listingID){
    if(window.confirm("Are you sure you want to delete ?")){
      await deleteDoc(doc(db, "listings", listingID))
      const updatedListings = listings.filter(
        (listing)=> listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
   
  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`);
  }
  
  return (
    <>
      <section className='w-full max-w-5xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-center font-bold text-3xl mt-6'>My Profile</h1>
      <div className='w-full md:w-[50%] px-4 mt-6'>
        <form>
          {/* Name input */}
          <input type="text" name="" id="name" value={name} onChange={onChange} disabled={!changeDetail} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && 'bg-red-200'}`} />

          {/* Email input */}
          <input type="email" name="" id="email" value={email} disabled className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' />

          {/* Changing button / Sign out */}
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p>
              Do want change your name ?
              <span onClick={() => {
                changeDetail && onSubmit();
                setChangeDetail((prevState) => !prevState)
              }} className='px-1 text-red-600 hover:text-red-700 transition ease-in-out cursor-pointer'>{changeDetail ? "Apply change" : "Edit"}</span>
            </p>
            <p onClick={logOut} className='text-blue-700 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
          </div>
        </form>
        <button type="submit" className='w-full bg-blue-600 px-7 py-3 text-white text-sm font-medium shadow-md rounded hover:bg-blue-700 tansition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 uppercase'>
          <Link to="/create-listing" className='flex justify-center items-center gap-2'>
              <FcHome className='bg-red-200 text-3xl rounded-full p-1 border-2 '/>
              Sell or rent your home 
          </Link>
        </button> 
      </div>
      </section>

      <div className='max-w-6xl px-3 mt-6 mx-auto'>
        {!loading && listings.length > 0 && (
          <>
            <h2 className='text-2xl text-center font-semibold'>My Listings</h2>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  mt-6 mb-6'>
              {listings.map((listing)=>(
                <ListingItem 
                key={listing.id} 
                id={listing.id} 
                listing={listing.data}
                onDelete={()=>onDelete(listing.id)}
                onEdit={()=>onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
    
  );
}
