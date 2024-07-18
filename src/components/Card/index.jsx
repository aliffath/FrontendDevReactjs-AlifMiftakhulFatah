import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
const Card = ({ imgSrc, name, city, linkTo, rate }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg mb-5">
        <figure>
          <img
            src={imgSrc}
            alt=""
            className="rounded-t-lg"
            height={350}
            width={350}
          />
        </figure>
        <div className="p-3">
          <h4 className="font-semibold text-lg">{name}</h4>
          <div className="flex justify-between items-center">
            <Rating rating={rate} />
            <p className="text-md text-gray-500">{city}</p>
          </div>
          <Link to={linkTo}>
            <button className="bg-sky-900 text-white rounded-md py-1 w-full my-4 font-semibold">
              Lean More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
