"use client";
import { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import { handleJoinCommunity } from "../page";

export default function ExplorePage() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Stores the currently logged-in user


  useEffect(() => {
    async function fetchCommunities() {
      const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from localStorage
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
            console.log(popularCommunities)
            setCommunities(popularCommunities);
          } else {
            console.error("Failed to fetch popular communities.");
          }
        } catch (error) {
          console.error("Error fetching popular communities:", error);
        } finally {
          setLoading(false);
        }
        return;
      }
      try {
        // Fetch communities the user is not a member of
        const response = await fetch("http://127.0.0.1:5000/api/communities/not_member", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCommunities(data);
          console.log(data);
        } else {
          console.error("Failed to fetch communities.");
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Explore Communities</h1>
      {communities.length > 0 ? (
        communities.map((sub, index) => (
          <CommunityCard 
              key={index} 
              name={sub.name} 
              body={sub.description}
              imageUrl={sub.image_url || null}
              members={sub.num_members}
              isOwner={false}
              joined={sub.joined || false} // Pass the joined status
              onJoin={() => handleJoinCommunity(sub.name)} // Handle join action 
              />
        ))
      ) : (
        <p>There is nothing to explore. You are part of all popular communities!</p>
      )}
    </div>
  );
}
  