import React from "react";

const UserHome = ({ userId }: { userId: string }) => {
  // const { userId } = useParams();

  return (
    <div>
      <h2>User Details for User ID: {userId}</h2>
    </div>
  );
};

export default UserHome;
