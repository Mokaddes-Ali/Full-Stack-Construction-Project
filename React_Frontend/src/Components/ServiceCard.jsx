// import { HoverEffect } from "../Components/Ui/Card-hover-effect";

// export function CardHoverEffectDemo() {
//   return (
//     (<div className="max-w-5xl mx-auto px-8">
//       <HoverEffect items={projects} />
//     </div>)
//   );
// }
// export const projects = [
//   {
//     title: "Stripe",
//     description:
//       "A technology company that builds economic infrastructure for the internet.",
//     link: "https://stripe.com",
//   },
//   {
//     title: "Netflix",
//     description:
//       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "https://netflix.com",
//   },
//   {
//     title: "Google",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
//   {
//     title: "Meta",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//   },
//   {
//     title: "Amazon",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//   },
//   {
//     title: "Microsoft",
//     description:
//       "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//   },
// ];


// Sample component usage
// import { HoverEffect } from "../Components/Ui/Card-hover-effect";

// export function CardHoverEffectDemo() {
//   return (
//     <div className="max-w-5xl mx-auto px-8">
//       <HoverEffect items={projects} />
//     </div>
//   );
// }

// export const projects = [
//   {
//     title: "Stripe",
//     description: "A technology company that builds economic infrastructure for the internet.",
//     link: "https://stripe.com",
//     image: "https://example.com/stripe.jpg",
//   },
//   {
//     title: "Netflix",
//     description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "https://netflix.com",
//     image: "https://example.com/netflix.jpg",
//   },
//   {
//     title: "Google",
//     description: "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//     image: "https://example.com/google.jpg",
//   },
//   {
//     title: "Meta",
//     description: "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//     image: "https://example.com/meta.jpg",
//   },
//   {
//     title: "Amazon",
//     description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//     image: "https://example.com/amazon.jpg",
//   },
//   {
//     title: "Microsoft",
//     description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//     image: "https://example.com/microsoft.jpg",
//   },
// ];

import React, {useState, useEffect} from 'react'
import { apiUrl, token } from './http';





const callouts = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

export default function ServiceCard() {

const [services, setServices] = useState([]);

 const fetchLatestServices = async () => {
  const res = await fetch(apiUrl + 'get-latest-service?limit=3', {
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
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Service Control Image In Backend</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
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
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

