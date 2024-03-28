import { useCallback, useEffect, useState } from "react";
import { UserEntry, backendBaseUrl } from "../helpers";
import Chat from "./chat";

const UserHome = ({ userId }: { userId: string }) => {
  const [usersToChat, setUsersToChat] = useState<UserEntry[]>([]);

  const fetchChatWithOtherUsers = useCallback(async () => {
    try {
      const response = await fetch(backendBaseUrl + `/api/userChat/${userId}`, {
        method: "POST",
      });
      const userEntries: UserEntry[] = await response.json();
      if (userEntries) {
        setUsersToChat(userEntries);
      }
    } catch (error) {
      console.error("fetchChatWithOtherUsers failed with error: ", error);
    }
  }, [userId]);

  useEffect(() => {
    // Call api function to fetch chat with other users
    fetchChatWithOtherUsers();
  }, [fetchChatWithOtherUsers]);

  return (
    <div>
      <h2>Open Chats for UserId: {userId}</h2>

      {usersToChat && usersToChat.length > 0 && (
        <ul className="d-flex flex-column gap-3">
          {usersToChat?.map((user, index) => (
            <Chat
              key={index}
              userId={user.id}
              name={user?.name || ""}
              surname={user?.surname || ""}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserHome;
