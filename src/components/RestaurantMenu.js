import React from 'react';
import { CDN_URL } from "./../utils/constants"
import Shimmer from './Shimmer';
import {useParams} from 'react-router-dom'
import useRestaurantMenu from "./../utils/useRestaurantMenu"

const RestaurantMenu = () => {
    
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    if(resInfo === null) return (
        <div className="shimmer-container">
            {Array(10).fill(1).map((el, i) =>
                <Shimmer key={i} />
            )}
        </div>
    )
    const {name,cuisines,areaName,avgRatingString,totalRatingsString} = resInfo?.cards?.[0]?.card?.card?.info || {}
    const { itemCards } = resInfo?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card || {};
    
    console.log("dsfdsf", resInfo?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card)
    console.log("itemCards", resInfo?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card)
    return  (
        
        <>
            <div className="restaurantHeader_wrapper">
                <div className="nameAddress_wrapper">
                    <p>{name}</p>
                    <p>{cuisines?.join(", ")}</p>
                    <p>{areaName}, {resInfo?.cards?.[0]?.card?.card?.info?.sla?.lastMileTravelString}</p>
                </div>
                <div className="rating_wrapper">
                    <button aria-hidden="true" className="btn_wrapper">
                        <span aria-hidden="true" className="ratings_avgRating">
                            <span className="icon-star"></span>
                            <span>{avgRatingString}</span>
                        </span>
                        <span aria-hidden="true">{totalRatingsString}</span>
                    </button>
                </div>
                </div>
                <div className="menu_wrapper">
                <button>Recommended </button>
                {
                    itemCards.map(item => (
                        <div className="menus" key={item.card.info.id}>
                            <div className="menu-details">
                                <h3>{item.card.info.name}</h3>
                                <span>Rs. {item.card.info.price / 100 || item.card.info.defaultPrice/100}</span>
                                <p>{item?.card?.info?.description}</p>
                            </div>
                            <div className="menu-img-container">
                                <img src={CDN_URL + item.card.info.imageId} className="menu-img"/>
                                <button className="btn">Add</button>
                            </div>
                        </div>
                    ))
                }
                </div>
            
        </>
    );
};

export default RestaurantMenu;
