"use client";

import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

import CreateCommunity from "../components/createCommunity";

export default function Home() {
  const [user, setUser] = useState(null); // Stores the currently logged-in user
  const [communities, setCommunities] = useState([]); // Stores the list of communities to display

  // Fetch user and communities on component mount
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from localStorage
      console.log(token)

      if (!token) {
        console.error("No token found. User is not logged in.");
        setUser(null);
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch("http://127.0.0.1:5000/api/is_logged_in", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);

          console.log("Home page. Current user:", userData);

          // Fetch communities based on the user
          const communitiesResponse = await fetch(
            `http://127.0.0.1:5000/api/communities/${userData.user_id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token
              },
            }
          );

          if (communitiesResponse.ok) {
            console.log("User's communities being loaded")
            const communitiesData = await communitiesResponse.json();
            setCommunities(communitiesData);
          } else {
            console.error("Failed to fetch communities.");
          }
        } else {
          console.error("Failed to fetch user data.");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser(null);
      }
    }

    fetchData();
  }, []);

  const refreshCommunities = async () => {
    const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token

    if (user && token) {
      try {
        const updatedCommunities = await fetch(
          `http://127.0.0.1:5000/api/communities/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token
            },
          }
        ).then((res) => res.json());

        setCommunities(updatedCommunities);
      } catch (error) {
        console.error("Error refreshing communities:", error);
      }
    }
  };

  return (
    <div>
      <h1>{user ? "Your Communities" : "Popular Communities"}</h1>
      {communities.map((community) => (
        <PostCard
          key={community.name}
          title={community.name}
          body={community.description}
          imageUrl={community.image_url || null}
          members={community.num_members}
        />
      ))}

      {user && (
        <CreateCommunity userId={user.id} onCommunityCreated={refreshCommunities} />
      )}

      {!user && <p>Please log in to create a community.</p>}
    </div>
  );
}
