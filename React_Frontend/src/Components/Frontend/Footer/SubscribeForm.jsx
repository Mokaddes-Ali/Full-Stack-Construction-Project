import { useState } from "react"
import { apiUrl, token } from "../../Backend/http";
import { toast } from 'react-toastify';

const SubscribeForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        
        try {
        const res = await fetch (apiUrl + "subscribe/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token()}`,
            },
            body: JSON.stringify({email}),
        });
        const data = await res.json();
        if(res.ok){
              toast.success(data.message || "Subscribed successfully!");
              setEmail("");
        }else{
            toast.error(data.message || "Something went wrong.");
        }
         } catch (err) {
      toast.error("Network error. Please try again.");
    }
        setLoading(false);
      
    };
  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        type="email"
        placeholder="Enter Your Email"
        required
        className="px-4 py-2 border"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <button type="submit" className = "px-4 py-2 text-white bg-blue-600" disabled={loading}>
            {loading ? "Loading....." : "Subscribe" }
        </button>
    </form>
      
    </>
  )
}

export default SubscribeForm
