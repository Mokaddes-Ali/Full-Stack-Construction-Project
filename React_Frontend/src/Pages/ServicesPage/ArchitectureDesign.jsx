import { useState } from "react";
import NavbarSection from "../../Components/Frontend/Navbar/NavbarSection"

const services = [
  {
    title: "Architecture Design",
    path: "architecture-design",
    image: "https://via.placeholder.com/300",
    shortDesc: "Innovative architectural designs for modern living.",
    description: "We provide creative and sustainable architectural designs that enhance living experiences and environmental harmony.",
  },
  {
    title: "Building Construction",
    path: "building-construction",
    image: "https://via.placeholder.com/300",
    shortDesc: "Expert construction services with quality assurance.",
    description: "Our construction team ensures quality, durability, and precision in every project we undertake.",
  },
  {
    title: "Building Maintenance",
    path: "building-maintenance",
    image: "https://via.placeholder.com/300",
    shortDesc: "Keeping your buildings in top condition.",
    description: "We offer maintenance services that extend the lifespan of your property and keep it looking brand new.",
  },
  {
    title: "Building Renovation",
    path: "building-renovation",
    image: "https://via.placeholder.com/300",
    shortDesc: "Transforming spaces into modern masterpieces.",
    description: "Our renovation services breathe new life into old structures with contemporary designs and superior craftsmanship.",
  },
  {
    title: "Flooring & Roofing",
    path: "flooring-roofing",
    image: "https://via.placeholder.com/300",
    shortDesc: "High-quality flooring and roofing solutions.",
    description: "We provide top-notch flooring and roofing services that enhance durability and aesthetics.",
  },
  {
    title: "Project Management",
    path: "project-management",
    image: "https://via.placeholder.com/300",
    shortDesc: "Efficient management for successful projects.",
    description: "Our project management services ensure timely completion, cost-efficiency, and quality standards.",
  },
];


const ArchitectureDesign = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  return (
    <>
    <NavbarSection />

    <div className="text-red-800">
  <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5">
        <h2 className="text-lg font-bold mb-4">Services</h2>
        <ul>
          {services.map((service) => (
            <li key={service.path}>
              <button
                onClick={() => setSelectedService(service)}
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedService.path === service.path ? "bg-orange-500" : "hover:bg-gray-700"
                }`}
              >
                {service.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div className="w-3/4 p-5">
        <h2 className="text-2xl font-bold mb-4">{selectedService.title}</h2>
        <img src={selectedService.image} alt={selectedService.title} className="w-full h-64 object-cover rounded mb-4" />
        <p className="text-gray-500 text-lg mb-2">{selectedService.shortDesc}</p>
        <p className="text-gray-700">{selectedService.description}</p>
      </div>
    </div>

    </div>
    </>
  )
}

export default ArchitectureDesign