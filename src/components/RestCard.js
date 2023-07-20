import React from 'react';
import { CDN_URL } from "./../utils/constants"

const RestCard = (props) =>{
    const { restData } = props;
    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        deliveryTime,
        id
    } = restData?.data;
    return (
        <div className="w-full rounded-lg shadow-md lg:max-w-sm p-2 bg-gradient-to-r from-sky-200 to-white-500">
            <img src={CDN_URL + cloudinaryImageId} className="object-cover w-full h-48" alt="image" />
            <div className="p-4">
                <h4 className="text-xl font-semibold text-violet-600">

                    {name}
                </h4>
                <p className="mb-2 leading-normal break-words">
                    {cuisines.join(',')}
                </p>
                <span>{avgRating}</span>
                <span>Rs.{costForTwo / 100} FOR TWO</span>
                <span>{deliveryTime} minutes</span>
                <button className="px-4 py-2 text-sm text-black-100 bg-orange-100 rounded shadow">
                    View More
                </button>
            </div>
            
        </div>
    )
}
export default RestCard;