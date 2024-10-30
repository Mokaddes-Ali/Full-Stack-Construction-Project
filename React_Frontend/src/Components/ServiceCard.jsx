import { useState, useEffect } from 'react';
import { apiUrl, fileUrl } from './http';

export default function ServiceCard() {
  const [services, setServices] = useState([]);

  const fetchLatestServices = async () => {
    const res = await fetch(apiUrl + 'get-latest-service?limit=3', {
      method: 'GET',
    });

    const result = await res.json();
    console.log(result);
    setServices(result.data);
  };

  useEffect(() => {
    fetchLatestServices();
  }, []);

  return (
    <>
      <div className="w-screen">
        <div className="mx-auto max-w-7xl bg-black  sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl text-center font-bold text-gray-900">
              Service Control Image In Backend
            </h2>
            <div className="mt-1 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {services &&
                services.map((service) => {
                  return (
                    <div key={service.id} className="group relative">
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                        <img
                          alt=""
                          src={`${fileUrl}uploads/services/small/${service.image}`}
                          className="h-full w-full bg-cover bg-center"
                        />
                        {/* Title always visible on image */}
                        <h3 className="absolute bottom-1 left-0 right-0 text-lg font-bold text-white p-4 bg-opacity-50 transition-transform duration-300
                        group-hover:z-30 group-hover:bottom-20 group-hover:text-white group-hover:translate-y-[-50%]">
                          {service.title}
                        </h3>
                  
                        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-white">
                          <p className="text-sm">{service.short_desc}</p>
                          <p className="text-sm">{service.content}</p>
                          <a
                            href={service.href}
                            className="inline-block mt-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
