import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);
  // offers
  useEffect(()=>{
    async function fetchOfferListings(){
      try {

        // get reference
        const listingsRef = collection(db, "listings");
        const q =query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));

        // execute query
        const querySnap = await getDocs(q);
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setOfferListings(listings)
        console.log(offerListings);
        
      } catch (error) {
        console.log(error);
      }

    }
    fetchOfferListings();
  }, []);
  // places for rent
  useEffect(()=>{
    async function fetchRentListings(){
      try {

        // get reference
        const listingsRef = collection(db, "listings");
        const q =query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));

        // execute query
        const querySnap = await getDocs(q);
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setRentListings(listings)
        console.log(rentListings);
        
      } catch (error) {
        console.log(error);
      }

    }
    fetchRentListings();
  }, []);
  // places for sale
  useEffect(()=>{
    async function fetchSaleListings(){
      try {

        // get reference
        const listingsRef = collection(db, "listings");
        const q =query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4));

        // execute query
        const querySnap = await getDocs(q);
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setSaleListings(listings)
        console.log(saleListings);
        
      } catch (error) {
        console.log(error);
      }

    }
    fetchSaleListings();
  }, []);
  

  return (
    <div>
      <Slider />
      <div className="maw-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
              <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent offers</h2>
              <Link to="/offers">
                <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {offerListings.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                ))}
              </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
              <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for rent</h2>
              <Link to="/category/rent">
                <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for rent</p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rentListings.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                ))}
              </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
              <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for sale</h2>
              <Link to="/category/sale">
                <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for sale</p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {saleListings.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                ))}
              </ul>
          </div>
        )}
      </div>
    </div>
  );
}
