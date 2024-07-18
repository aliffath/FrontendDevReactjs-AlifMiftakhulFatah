import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Home = () => {
  const { debounce } = useDebounce();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [message, setMessage] = useState("");
  const [visibleDataCount, setVisibleDataCount] = useState(8);

  const getData = (url) => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data?.restaurants?.length > 0) {
          setData(data.restaurants);
          setMessage("");
        } else {
          setData([]);
          setMessage("Not Found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data");
      });
  };

  const performSearch = () => {
    if (search !== "") {
      getData(`https://restaurant-api.dicoding.dev/search?q=${search}`);
    } else {
      getData("https://restaurant-api.dicoding.dev/list");
    }
  };

  const debouncedSearch = debounce(performSearch, 1000);

  const city = [
    "Surabaya",
    "Bandung",
    "Aceh",
    "Balikpapan",
    "Bali",
    "Ternate",
    "Malang",
    "Medan",
    "Gorontalo",
  ];

  const rating = [1, 2, 3, 4, 5];

  useEffect(() => {
    getData("https://restaurant-api.dicoding.dev/list");
  }, []);

  useEffect(() => {
    debouncedSearch();
  }, [search]);

  const loadMore = () => {
    setVisibleDataCount((prevCount) => prevCount + 4);
  };

  const filteredData = data
    ?.filter(
      (item) =>
        (!filterCity || item.city === filterCity) &&
        (!filterRating ||
          (item.rating >= Number(filterRating) &&
            item.rating < Number(filterRating) + 1))
    )
    .slice(0, visibleDataCount);

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-stone-800">Restaurants</h1>
        <p className="text-lg ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente,
          iusto. Ipsum, illum. Ratione iure, quisquam nisi aut ducimus quaerat
          maxime beatae velit blanditiis minima voluptas, quam eius cum
          perferendis consequatur.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 p-5">
        <div className="flex gap-5">
          <select
            className="select select-bordered"
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option disabled selected>
              Pilih Kota
            </option>
            {city.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFilterCity("")}
            className="bg-red-700 text-white px-5 font-bold rounded-lg"
          >
            Reset
          </button>
        </div>
        <div className="flex gap-5">
          <select
            className="select select-bordered"
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option disabled selected>
              Pilih Rating
            </option>
            {rating?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFilterRating("")}
            className="bg-red-700 text-white px-5 font-bold rounded-lg"
          >
            Reset
          </button>
        </div>

        <div>
          <label
            htmlFor="search"
            className="input input-bordered flex items-center gap-2 px-8"
          >
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name and category"
              className="w-full"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      {message && (
        <h3 className="text-center text-red-600 text-2xl font-bold">
          {message}
        </h3>
      )}

      <div className=" w-full flex flex-col items-center my-7 justify-center  px-5 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex justify-center items-center flex-col"
            >
              <Card
                imgSrc={`https://restaurant-api.dicoding.dev/images/medium/${item?.pictureId}`}
                name={item.name}
                city={item.city}
                linkTo={`/detail/${item?.id}`}
                rate={item.rating}
              />
            </div>
          ))
        ) : (
          <div className="col-span-4">
            {" "}
            <h3 className="text-center text-red-600 text-2xl font-bold">
              Not Found
            </h3>
          </div>
        )}
      </div>
      {filteredData.length < data.length && (
        <div className="flex justify-center mb-10">
          <button
            onClick={loadMore}
            className="bg-sky-900 text-white rounded-md py-2 px-8 font-semibold hover:bg-white hover:text-sky-900 hover:border border-2 border-sky-900"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
