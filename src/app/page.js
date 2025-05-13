"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import PostCard from "../components/CommunityCard";

import CreateCommunity from "../components/createCommunity";
import CommunityCard from "../components/CommunityCard";
import CreatePostForm from "@/components/CreatePostForm/CreatePostForm";


export const handleJoinCommunity = async (communityName) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    // Store the community name in localStorage
    localStorage.setItem("pendingCommunity", communityName);
    router.push('/login');
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:5000/api/communities/${communityName}/add_member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ communityName }),
    });

    if (response.ok) {
      alert(`You have successfully joined ${communityName}!`);
      refreshCommunities(); // Refresh the communities list
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to join the community.");
    }
  } catch (error) {
    console.error("Error joining community:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

export default function Home() {
  const router = useRouter(); // Initialize router
  const [user, setUser] = useState(null); // Stores the currently logged-in user
  const [communities, setCommunities] = useState([]); // Stores the list of communities to display

  const handleCommunityCreated = (newCommunity) => {
    setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
  };


  // Fetch user and communities on component mount
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from localStorage
      console.log(token)

      if (!token) {
        setUser(null);
        console.log("No token found. Fetching popular communities.");
        try {
          // Fetch popular communities
          const popularResponse = await fetch("http://127.0.0.1:5000/api/communities/popular", {
            method: "GET",
          });

          if (popularResponse.ok) {
            const popularCommunities = await popularResponse.json();
            setCommunities(popularCommunities);
          } else {
            console.error("Failed to fetch popular communities.");
          }
        } catch (error) {
          console.error("Error fetching popular communities:", error);
        }
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

          // Check for pending community
          const pendingCommunity = localStorage.getItem("pendingCommunity");
          if (pendingCommunity) {
            console.log(`Joining pending community: ${pendingCommunity}`);
            await handleJoinCommunity(pendingCommunity); // Automatically join the pending community
            localStorage.removeItem("pendingCommunity"); // Clear the pending community
          }
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
      <h1>Create Post</h1>
      <CreatePostForm />

      <h1>{user ? "Your Communities" : "Popular Communities"}</h1>
      {communities.length > 0 ? (
      communities.map((community) => {
        // Ensure num_members is not null
        const numMembers = community.num_members || 0;
        return (<CommunityCard
          key={community.name}
          name={community.name}
          body={community.description}
          imageUrl={community.image_url || null}
          isOwner={!!user}
          joined={true}
          members={numMembers}
          onJoin={() => handleJoinCommunity(community.name)} // Handle join action
        />
        );
        
  })
    ) : (
      <p>{user ? "You are not part of any communities yet." : "No popular communities to display."}</p>
    )}

    {user && (
      <CreateCommunity userId={user.id} onCommunityCreated={handleCommunityCreated} />
    )}

    {!user && <p>Please log in to create a community.</p>}
    </div>
  );
}
