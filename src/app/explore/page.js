import CommunityCard from "@/components/CommunityCard";

const communities = [
  { name: "r/programming", members: "6.8M" },
  { name: "r/learnprogramming", members: "3.8M" },
  { name: "r/javascript", members: "2.3M" },
  { name: "r/webdev", members: "1.6M" },
  { name: "r/reactjs", members: "338K" },
  { name: "r/node", members: "228K" },
  { name: "r/learnjavascript", members: "222K" },
  { name: "r/coding", members: "490K" },
  { name: "r/technology", members: "13M" },
  { name: "r/computerscience", members: "1.2M" },
  { name: "r/linux", members: "1.1M" },
  { name: "r/buildapc", members: "6M" },
  { name: "r/hardware", members: "1.2M" },
  { name: "r/sysadmin", members: "1.3M" },
  { name: "r/techsupport", members: "1.1M" },
  { name: "r/opensource", members: "210K" },
  { name: "r/itcareerquestions", members: "1.1M" },
  { name: "r/quantumcomputing", members: "167K" },
  { name: "r/cybersecurity", members: "1.2M" },
  { name: "r/artificial", members: "500K" }
];  

export default function ExplorePage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Explore Communities</h1>
      {communities.map((sub, index) => (
        <CommunityCard key={index} title={sub.name} members={sub.members} />
      ))}
    </div>
  );
}
  