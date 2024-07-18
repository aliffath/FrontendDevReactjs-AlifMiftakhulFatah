import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
const Detail = () => {
  const { restaurantId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(
          `https://restaurant-api.dicoding.dev/detail/${restaurantId}`
        );
        setData(response.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };

    getDetail();
  }, []);
  return (
    <>
      <div className="my-7">
        <p className="text-center text-3xl font-bold">{data.name}</p>
      </div>

      <div className="flex justify-center items-center mx-5 flex-col">
        <img
          src={`https://restaurant-api.dicoding.dev/images/medium/${data?.pictureId}`}
          alt=""
          width={700}
          height={400}
        />
        <div className="my-5">
          <div className="mb-4">
            <p className="font-bold text-xl">Description :</p>
            <p className="text-gray-500">{data.description}</p>
          </div>

          <div className="mb-4">
            <p className="font-bold text-xl">Categories :</p>

            <ul className="list-disc pl-5">
              {data?.categories?.map((category, index) => (
                <li key={index} className="text-gray-500">
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-bold text-xl">Foods :</p>
            {data?.menus?.foods?.map((food, index) => (
              <div key={index}>
                <ul className="list-disc pl-5">
                  <li className="text-gray-500">{food.name}</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <p className="font-bold text-xl">Drinks :</p>
            {data?.menus?.drinks?.map((drink, index) => (
              <div key={index}>
                <ul className="list-disc pl-5">
                  <li className="text-gray-500">{drink.name}</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="font-bold text-xl">Reviews :</p>
            {data?.customerReviews?.map((review, index) => (
              <div key={index}>
                <p>{review.name} :</p>
                <p className="text-gray-500">{review.review}</p>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <p className="font-bold text-xl">Rating :</p>
            <Rating rating={data.rating} />
          </div>

          <div>
            <p className="font-bold text-xl">Address :</p>
            <p className="text-gray-500">
              {data.city}, {data.address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
