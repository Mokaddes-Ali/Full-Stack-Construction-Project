import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl, token } from "../Backend/http";
import { toast } from "react-toastify";

const SubscriberTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(apiUrl + "subscribers", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      toast.error("Failed to fetch subscribers");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const res = await fetch(apiUrl + `subscribers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      const data = await res.json();
      toast.success(data.message);
      fetchSubscribers(); // refresh list
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleSelect = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      const allEmails = subscribers.map((s) => s.email);
      setSelectedEmails(allEmails);
    }
    setSelectAll(!selectAll);
  };

  const handleSendEmail = () => {
    if (selectedEmails.length === 0) {
      toast.error("Please select at least one subscriber.");
      return;
    }
    navigate("/send-email", { state: { emails: selectedEmails } });
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Subscribers</h2>
      <table className="w-full text-sm text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th className="p-2">#</th>
            <th className="p-2">Email</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr key={subscriber.id} className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(subscriber.email)}
                  onChange={() => handleSelect(subscriber.email)}
                />
              </td>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{subscriber.email}</td>
              <td className="p-2 text-right">
                <button
                  onClick={() => handleDelete(subscriber.id)}
                  className="px-2 py-1 text-xs text-white bg-red-600 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {subscribers.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No subscribers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <button
          onClick={handleSendEmail}
          className="px-4 py-2 text-white bg-green-600 rounded"
        >
          Send Email to Selected
        </button>
      </div>
    </div>
  );
};

export default SubscriberTable;
