import { useState } from "react";

const Chat = ({
  userId,
  name,
  surname,
}: {
  userId?: number;
  name: string;
  surname: string;
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <li>
      <button
        className="btn btn-secondary"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <h2>
          User Details: {name} {surname}
        </h2>
      </button>
    </li>
  );
};

export default Chat;
