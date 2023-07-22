import React,{useEffect, useState} from 'react';
import RestCard from './RestCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom'
import useOnlineStatus from "./../utils/useOnlineStatus"

const Body = () => {
    const [restarantList,setRestList] = useState([]);
    const [filtredRestarantList,setFiltredRestList] = useState([]);
    const [restaurantCnt,setRestaurantCnt] = useState('');
    const [searchval,setSearchVal] = useState('');
    const [isOpenDroupdown,setOpenDroupdown] = useState(false);

    const onlineStatus = useOnlineStatus();

    const handleDropDown = () => {
        setOpenDroupdown(!isOpenDroupdown)
    }

    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async () =>{
        const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5532691&lng=73.9231229&page_type=DESKTOP_WEB_LISTING');
        const json = await data.json();
        const allrest = json?.data?.cards?.[2]?.data?.data?.cards;
        setRestList(allrest);
        setFiltredRestList(allrest);
        setRestaurantCnt(allrest.length)
    }
    //conditional rendering

    if (onlineStatus === false) return (<h1>Looks like you are offline...</h1>)
    return filtredRestarantList.length === 0 ? 
        <div className="shimmer-container">
            {Array(10).fill(1).map((el, i) =>
                <Shimmer key={i} />
            )}
        </div> : (
        <div className="bodycontainer mt-2">
            <div className="flex m-2 justify-end">
                <button className="mr-2 shadow-md lg:max-w-sm p-2 bg-gradient-to-r from-sky-200 to-white-500" onClick={()=>{
                    setFiltredRestList(restarantList)
                    setRestaurantCnt(restarantList.length)
                }}>All Restaurants</button>
                
                <button className="mr-2 shadow-md lg:max-w-sm p-2 bg-gradient-to-r from-sky-200 to-white-500" onClick={()=>{
                    const filteredList =  restarantList.filter((res) => res.data.avgRating > 4);
                    setFiltredRestList(filteredList);
                    setRestaurantCnt(filteredList.length)
                }}>Top Rated Restaurants</button>
                <input className="placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" onChange={(e)=>{
                    setSearchVal(e.target.value)
                }}  placeholder="Search for anything..." type="text" name="search"/>
                
                <button className="search-btn body-btn shadow-md lg:max-w-sm p-2 bg-gradient-to-r from-sky-200 to-white-500" onClick={() => {
                    if(searchval === ''){
                        setFiltredRestList(restarantList)
                        setRestaurantCnt(restarantList.length)
                    }else{
                        const filteredList =  restarantList.filter((res) => res?.data?.name?.toLowerCase()?.includes(searchval.toLowerCase()));
                        console.log(filteredList);
                        setFiltredRestList(filteredList);
                        setRestaurantCnt(filteredList.length)
                    }
                    
                }}>Search</button>
            </div>
            <div className="flex m-2">
            

            

            <button className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border   rounded-full mr-2">
                Filter By
            </button>
            
            <div className="inline-flex bg-white border rounded-full mr-2">
                <a  className="hover:bg-black-500 text-black-700 font-semibold hover:text-black px-4 py-2 "
                >Sort By</a>

                <div className="relative ">
                    <button
                    type="button" onClick={handleDropDown}
                    className="inline-flex items-center justify-center h-full px-2 text-gray-600 "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        ><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>

                    <div className={`absolute right-0 z-10 w-56 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg ${
                        isOpenDroupdown ? "block" : "hidden"}`} >
                        <div className="p-2">
                        <a  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"  onClick={()=>{
                            const filteredList = [...restarantList].sort((a, b) => parseInt(a?.data?.deliveryTime) - parseInt(b?.data?.deliveryTime));
                            
                            setFiltredRestList(filteredList);
                        }}>
                            Delivery Time
                        </a>
                        <a  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700" onClick={()=>{
                            const filteredList = restarantList.sort((a, b) => parseFloat(b?.data?.avgRating) -  parseFloat(a?.data?.avgRating))
                            
                            setFiltredRestList(filteredList);
                        }}>
                            Rating
                        </a>
                        <a  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"  onClick={() => {
                            const filteredList = [...restarantList].sort((a, b) => parseFloat(a.data.costForTwo) - parseFloat(b.data.costForTwo));
                            
                            setFiltredRestList(filteredList);
                        }}>
                            Cost: Low to High
                        </a>
                        <a  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"  onClick={()=>{
                            const filteredList = [...restarantList].sort((a, b) => parseFloat(b.data.costForTwo) - parseFloat(a.data.costForTwo));
                            
                            setFiltredRestList(filteredList);
                        }}>
                            Cost: High to Low
                        </a>
                    </div>
                </div>
            </div>
            </div>

            <button className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border   rounded-full mr-2">
                Fast Delivery
            </button>
            <button className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border   rounded-full mr-2">
                Ratings 4+
            </button>
            </div>
            
            <div className=" m-2 head font-bold underline">{restaurantCnt} Restaurants</div>
            
            
            <div className='grid gap-2 lg:grid-cols-4 m-2'>
                
                {
                    filtredRestarantList.map(restaurant =>(
                        <Link key={restaurant.data.id} to={"/restaurants/"+restaurant.data.id}><RestCard  restData={restaurant} /></Link>
                    ))
                }
            </div>
        </div>
    )

}
export default Body;