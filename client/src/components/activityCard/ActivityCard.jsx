import "./activityCard.css";

export default function ActivityCard({ name, difficulty, duration, season }) {
  return (
    <div className="activityCard">
      <button>+</button>
      <h2>{name}</h2>
      <h4>Difficulty: {difficulty}</h4>
      <h4>Duration: {duration}</h4>
      <h4>Season: {season}</h4>
    </div>
  );
}
