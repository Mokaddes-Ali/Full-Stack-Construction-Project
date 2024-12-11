// import { useState } from 'react';
// import { register } from './Api';

// export default function Register() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(formData);
//       alert('Registration successful');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//       <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//       <input type="password" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
//       <button type="submit">Register</button>
//     </form>
//   );
// }




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Api';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setMessage(response.data.message); // Success message set
      setTimeout(() => {
        navigate('/contact'); // Redirect to dashboard
      }, 2000); // 2 seconds delay before redirect
    } catch (error) {
      console.error(error);
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
