"use client"; // Required for client-side interactivity in Next.js

// import Image from "public/images";
// import styles from "./page.module.css";
import { useState, useEffect } from "react";
import PostCard from '../components/PostCard';
import createCommunity from "../app/createCommunity/createCommunity";

export default function Home() {
  const [user, setUser] = useState(null);   // Stores the currently logged-in user (or null if not logged in) 
  const [communities, setCommunities] = useState([]);   // Stores the list of communities to display

  // Fetch user and communities on component mount
  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetch("http://127.0.0.1:5000/api/is_logged_in", { 
        method: 'GET', 
        credentials: "include" // Include cookies for session management
        })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);
      setUser(userResponse);

      const communitiesResponse = userResponse
        ? await fetch(`/api/communities/${userResponse.id}`, { credentials: "include" }).then((res) => res.json())
        : await fetch("/api/communities/popular").then((res) => res.json());
      setCommunities(communitiesResponse);
    }

    fetchData();
  }, []);

  const refreshCommunities = async () => {
    if (user) {
      const updatedCommunities = await fetch(`/api/communities/${user.id}`, { credentials: "include" }).then((res) =>
        res.json()
      );
      setCommunities(updatedCommunities);
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
          imageUrl={community.imageUrl || null}
        />
      ))}

      {user && (
        <createCommunity userId={user.id} onCommunityCreated={refreshCommunities} />
      )}

      {!user && <p>Please log in to create a community.</p>}
    </div>
  );
}
