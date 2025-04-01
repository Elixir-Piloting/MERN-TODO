import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

export const Profile = () => {
  const [user, setUser] = useState(null); 
  const getUser = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/auth/profile", {
        withCredentials: true, 
      });

      console.log("Response:", response.data);

      
      if (response.data.success && response.data.user) {
        setUser(response.data.user); 
        console.log("User fetched:", response.data.user);
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []); 
  useEffect(() => {
    getUser(); 
    const interval = setInterval(getUser, 500000); 
    return () => clearInterval(interval); 
  }, [getUser]);

  return (
    <div>
      {user ? (
        <h2>Hello, {user.cusername}</h2> 
      ) : (
        <p>Loading...</p> // Show loading message while waiting for user data
      )}
    </div>
  );
};
