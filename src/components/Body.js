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

    const onlineStatus = useOnlineStatus();

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
        <div className="bodycontainer">
            <div className="filter">
                <button className="filter-btn body-btn" onClick={()=>{
                    setFiltredRestList(restarantList)
                    setRestaurantCnt(restarantList.length)
                }}>All Restaurants</button>
                <button className="filter-btn body-btn" onClick={()=>{
                    const filteredList =  restarantList.filter((res) => res.data.avgRating > 4);
                    setFiltredRestList(filteredList);
                    setRestaurantCnt(filteredList.length)
                }}>Top Rated Restaurants</button>
                <input type="text" onChange={(e)=>{
                    setSearchVal(e.target.value)
                }}  placeholder="Search restaurant..." className="search-input"/>
                <button className="search-btn body-btn" onClick={() => {
                    if(searchval == ''){
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
                <div className="main-filter-section">
                <div>
                        <div className="head font-bold underline">{restaurantCnt} Restaurants</div>
                </div>
                <div className="inner-filters-container">
                    <div className="inner-filters" onClick={()=>{
                            const filteredList = [...restarantList].sort((a, b) => parseInt(a?.data?.deliveryTime) - parseInt(b?.data?.deliveryTime));
                            
                            setFiltredRestList(filteredList);
                    }}>Delivery Time</div>
                    <div className="inner-filters" onClick={()=>{
                            const filteredList = restarantList.sort((a, b) => parseFloat(b?.data?.avgRating) -  parseFloat(a?.data?.avgRating))
                            
                            setFiltredRestList(filteredList);
                    }}>Rating</div>
                        <div className="inner-filters" onClick={() => {
                            const filteredList = [...restarantList].sort((a, b) => parseFloat(a.data.costForTwo) - parseFloat(b.data.costForTwo));
                            
                            setFiltredRestList(filteredList);
                        }}>Cost: Low to High</div>
                    <div className="inner-filters" onClick={()=>{
                            const filteredList = [...restarantList].sort((a, b) => parseFloat(b.data.costForTwo) - parseFloat(a.data.costForTwo));
                            
                            setFiltredRestList(filteredList);
                    }}>Cost: High to Low</div>
                </div>
            </div>
            
                <div className='grid gap-2 lg:grid-cols-4 mb-4'>
                
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