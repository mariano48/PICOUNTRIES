import "./activityCard.css";

export default function ActivityCard({ name, difficulty, duration, season }) {
  return (
    <div className="activityCard">
      <h2>{name}</h2>
      <p>Difficulty: {difficulty}</p>
      <p>Duration: {duration}</p>
      <p>Season: {season}</p>
    </div>
  );
}
