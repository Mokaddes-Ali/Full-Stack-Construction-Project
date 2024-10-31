import Card from './Card';
import team1 from '../../assets/Images/service-img-2.jpg'
import team2 from '../../assets/Images/service-img-2.jpg'
import team3 from '../../assets/Images/service-img-2.jpg'
import team4 from '../../assets/Images/service-img-2.jpg'

const chefs = [
  {
    image: team1,
    name: 'Full Name',
    designation: 'Designation',
  },
  {
    image: team2,
    name: 'Full Name',
    designation: 'Designation',
  },
  {
    image: team3,
    name: 'Full Name',
    designation: 'Designation',
  },
  {
    image: team4,
    name: 'Full Name',
    designation: 'Designation',
  },
];

const TeamMember = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg: lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {chefs.map((chef, index) => (
          <Card key={index} image={chef.image} name={chef.name} designation={chef.designation} />
        ))}
      </div>
    </div>
  );
};



export default TeamMember