import React, { useState, useContext, useEffect, createContext } from 'react';
import 'tailwindcss/tailwind.css';

const categories = ['Building Construction', 'Materials', 'Technology', 'Designing', 'Blue Print'];

const faqData = {
  'building-construction': [
    { question: 'Do you offer a free, no obligation quotation?', answer: 'Yes, we offer free quotations.' },
    { question: 'What services do you offer?', answer: 'We offer a variety of construction services.' },
    { question: 'What types of projects do you specialize in?', answer: 'We specialize in residential and commercial projects.' },
    { question: 'How do I start a project with your company?', answer: 'You can start by contacting us through our website.' },
  ],
  materials: [
    { question: 'Do you offer a free, no obligation quotation?', answer: 'Yes, we offer free quotations.' },
    { question: 'What services do you offer?', answer: 'We offer a variety of material supply services.' },
    { question: 'What types of projects do you specialize in?', answer: 'We specialize in supplying materials for all types of projects.' },
    { question: 'How do I start a project with your company?', answer: 'You can start by contacting us through our website.' },
  ],
  technology: [
    { question: 'Do you offer a free, no obligation quotation?', answer: 'Yes, we offer free quotations.' },
    { question: 'What services do you offer?', answer: 'We offer a variety of technology services.' },
    { question: 'What types of projects do you specialize in?', answer: 'We specialize in technology integration projects.' },
    { question: 'How do I start a project with your company?', answer: 'You can start by contacting us through our website.' },
  ],
  designing: [
    { question: 'Do you offer a free, no obligation quotation?', answer: 'Yes, we offer free quotations.' },
    { question: 'What services do you offer?', answer: 'We offer a variety of designing services.' },
    { question: 'What types of projects do you specialize in?', answer: 'We specialize in residential and commercial design projects.' },
    { question: 'How do I start a project with your company?', answer: 'You can start by contacting us through our website.' },
  ],
  'blue-print': [
    { question: 'Do you offer a free, no obligation quotation?', answer: 'Yes, we offer free quotations.' },
    { question: 'What services do you offer?', answer: 'We offer a variety of blueprint services.' },
    { question: 'What types of projects do you specialize in?', answer: 'We specialize in creating blueprints for all types of projects.' },
    { question: 'How do I start a project with your company?', answer: 'You can start by contacting us through our website.' },
  ],
};

// Create a context for routing
const RouterContext = createContext();

function RouterProvider({ children }) {
  const [route, setRoute] = useState(`/category/${categories[0].toLowerCase().replace(/ /g, '-')}`); // Default category on load

  const navigate = (path) => {
    setRoute(path);
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouter() {
  return useContext(RouterContext);
}

function Sidebar() {
  const { navigate, route } = useRouter();

  return (
    <div className="w-1/4 h-screen bg-gray-200 p-4 overflow-y-auto">
      <ul>
        {categories.map((category) => {
          const path = `/category/${category.toLowerCase().replace(/ /g, '-')}`;
          const isActive = route === path; // Check if the category is active

          return (
            <li key={category} className="mb-2 flex items-center">
              <span className={`mr-2 ${isActive ? 'text-red-400' : 'text-orange-500'}`}>
                {isActive ? '▶' : '➤'}
              </span> {/* তীর আইকন */}
              <button
                onClick={() => navigate(path)}
                className={`text-blue-500 ${isActive ? 'text-red-400' : ''}`}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FAQ() {
  const { route } = useRouter();
  const category = route.split('/category/')[1];
  const [openIndex, setOpenIndex] = useState(0); // Default open the first FAQ

  const faqs = faqData[category] || [];

  useEffect(() => {
    setOpenIndex(0); // Auto-open the first FAQ when category changes
  }, [category]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="cursor-pointer flex justify-between items-center bg-gray-100 p-2"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-lg">{faq.question}</h3>
            <span className="text-orange-500">{openIndex === index ? '-' : '+'}</span>
          </div>
          {openIndex === index && <p className="p-2">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}

function FAQs() {
  const { route } = useRouter();
  const category = route.split('/category/')[1]?.replace(/-/g, ' ');

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4">
        {category ? (
          <h1 className="text-2xl font-bold capitalize">
            {category}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold">Select a category</h1>
        )}
        {route === '/' ? <div>Select a category</div> : <FAQ />}
      </div>
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <FAQs />
    </RouterProvider>
  );
}

export default App;
