import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase';
import  Spinner  from '../components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination} from "swiper";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import Contact from '../components/Contact';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';



export default function Listing() {
    const auth = getAuth();
    const [landLordContact, setLandLordContact] = useState(false);
    const params = useParams();
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    SwiperCore.use([Autoplay, Pagination, Navigation]);
    useEffect(()=>{
        async function fetchListing(){
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false);
            }
        }
        fetchListing();
        
    }, [params.listingId]);

    if(loading){
        return <Spinner />
    }
  return <main>
    <Swiper slidesPerView={1} navigation pagination={{type: "progressbar"}} effect='fade' modules={[EffectFade]} autoplay={{delay: 3000}}>
        {listing.imgUrls.map((url, index)=>(
            <SwiperSlide key={index}>
                <div className='relative w-full overflow-hidden h-[300px]' style={{
                    background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: "cover"
                    }}>

                </div>
            </SwiperSlide>
        ))}
    </Swiper>
    <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 w-12 h-12 rounded-full flex items-center justify-center" onClick={()=>{
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(()=>{
            setShareLinkCopied(false);
        }, 2000);
    }}>
        <FaShare className="text-lg text-slate-5020" />
    </div>
    {shareLinkCopied && <p className="fixed top-[23%] right-[3%] border-2 border-gray-400 rounded-md bg-white z-10">Link Copied</p>}

    <div className="w-full flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 bg-white rounded-lg shadow-md md:space-x-5  mt-3">
        <div className="w-full lg-[400px] " >
            <p className="text-2xl text-blue-900 font-semibold ">
                {listing.name} - ${" "}
                {listing.type === "rent" 
                ? `${listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / Month`  
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
            </p>
            <p className="flex items-center text--xl font-semibold mt-3">
                <FaMapMarkerAlt className="text-green-800" />
                {listing.address}
            </p>
            
            <div className='flex items-center gap-[20px] max-w-[100%] mt-3'>
                <p className='bg-red-800 p-1 rounded text-center text-white font-semibold w-[200px] '>
                    {listing.type === "rent" ? "For Rent" : "For Sale" }
                </p>
                {listing.offer && <p className="bg-green-800 p-1 rounded text-center text-white font-semibold w-[200px] "> ${+listing.regularPrice - +listing.discountedPrice} Discounted</p> }
            </div>
            
            <p className="mt-3"><span className="font-semibold">Description</span> - {listing.description} </p>

            <ul className="flex gap-[40px] mt-3 mb-6">
                <li className="flex gap-[2px] text-sm items-center font-semibold"><FaBed /> {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : "1 bed"} </li>
                <li className="flex gap-[2px] text-sm items-center font-semibold"><FaBath /> {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}</li>
                {listing.parking && <li className="flex gap-[2px] text-sm items-center font-semibold"><FaParking /> Parking Spot</li>}
                {listing.furnished && <li className="flex gap-[2px] text-sm items-center font-semibold"><FaChair /> Furnished</li>}
            </ul>
             {listing.userRef !== auth.currentUser?.uid && !landLordContact && (
                <div className="mt-6">
                    <button className='w-full py-3 px-7 bg-blue-700 rounded text-center text-white uppercase font-medium text-sm hover:bg-blue-800b focus:bg-blue-900 shadow-md' onClick={()=>setLandLordContact(true)}>Contact Landlord</button>
                </div>

             )}   
            {landLordContact && (
                <Contact userRef={listing.userRef} listing={listing} />
            )}
        </div>

        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-1">
        <MapContainer center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false} style={{height: "100%", width:"100%"}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
        </div>
    </div>    
  </main>
  
}
