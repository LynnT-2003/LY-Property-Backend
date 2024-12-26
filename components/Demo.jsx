"use client";
import React, { useState, useEffect } from "react";

const Demo = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      const data = await response.json();
      console.log(data);
      setProperties(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="pl-12 pt-4">
      LYPROPERTY
      <div>
        {properties.map((property) => (
          <div key={property._id} className="pt-8">
            <h1 className="text-3xl font-semibold font-sans">
              {property.name}
            </h1>
            {property.listings.map((listing) => (
              <div className="flex space-x-2" key={listing._id}>
                <h1 className="font-sans pt-1">
                  {listing.type} - {listing.price}THB
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo;
