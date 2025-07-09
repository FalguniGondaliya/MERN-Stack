import axios from "axios";
import { useEffect, useState } from "react";

function Movie() {
  let [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=girls")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      console.log("cleanup running");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        TV Shows: Girls
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {shows.map((item) => (
          <div
            key={item.show.id}
            className="bg-white rounded-md shadow-md transition duration-300 w-full"
          >
            {item.show.image && (
              <img
                src={item.show.image.original}
                className="w-full h-52 object-cover rounded-t-md"
              />
            )}
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.show.name}
              </h3>
              {item.show.language && (
                <p className="text-sm text-gray-600">
                  Language: {item.show.language}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;