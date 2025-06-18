import { useLocation } from "react-router-dom";

const SendEmailPage = () => {
  const location = useLocation();
  const selectedEmails = location.state?.emails || [];

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Send Email to:</h2>
      <ul className="mb-4 text-blue-700 list-disc list-inside">
        {selectedEmails.map((email, i) => (
          <li key={i}>{email}</li>
        ))}
      </ul>
      {/* Add form here to enter subject/message and send to backend */}
    </div>
  );
};

export default SendEmailPage;
