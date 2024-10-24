import {useState, useEffect} from 'react'
import { apiUrl, token, fileUrl } from './http';


export default function ServiceCard() {

const [services, setServices] = useState([]);

 const fetchLatestServices = async () => {
  const res = await fetch(apiUrl + 'get-latest-service?limit=3', { // limit is the most important in here 
    method: 'GET',

  });

  const result = await res.json();
  console.log(result);
  setServices(result.data);
}

useEffect(() => {
    fetchLatestServices();
}, []);


  return (
    <>
    <div className="bg-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Service Control Image In Backend</h2>

             <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">

             {
          services && services.map(service => {
            return (
              <div key={service.id} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <img
                  alt=""
                  src={`${fileUrl}uploads/services/small/${service.image}` }
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-white">
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="text-sm">{service.short_desc}</p>
                  <div>
                    <p className="text-sm">{service.content}</p>
                  </div>
                
                 
                  <a href={service.href} className="inline-block mt-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">
                    Read More
                  </a>
                </div>
              </div>
            </div>
             
            )
          })
         }
          
             
        
          </div>  


        

          {/* <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-white">
                    <h3 className="text-lg font-bold">{callout.name}</h3>
                    <p className="text-sm">{callout.description}</p>
                    <a href={callout.href} className="inline-block mt-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>  */}
        </div>
      </div>
    </div>
    </>
  )
}

