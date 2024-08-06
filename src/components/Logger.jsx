import "./css/Logger.css";
import { useState } from "react";

function Logger() {
  const getCurrentDayAndDate = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const time = new Date();
    const dayName = daysOfWeek[time.getDay()];
    const currentDate = time.toLocaleDateString();

    return `${dayName}, ${currentDate}`;
  };
  const [workoutInfo, setWorkoutInfo] = useState({
    name: `${getCurrentDayAndDate()}'s Workout`,
    typeName: "Chest",
    formCompleted: false,
  });
  return (
    <>
      <h1 className="t-center white">Logger</h1>
      <div className="logger-container">
        <h1 className="t-center white">{workoutInfo.name}</h1>
        <h2 className="t-center white">{workoutInfo.typeName} Day</h2>
        <div className="inputs-container">
          {/* Exercise Type Input */}
          <div className="input-container">
            <label htmlFor="ExerciseName">Exercise Name</label>
            <input name="ExerciseName" type="text" className="exercise-input" />
          </div>
          {/* Number Of Reps Input */}
          <div className="input-container">
            <label htmlFor="NumberOfReps" className="exercise-label">
              Number Of Reps
            </label>
            <input name="NumberOfReps" type="text" className="exercise-input" />
          </div>
          {/* Weight Input */}
          <div className="input-container">
            <label htmlFor="Weight" className="Weight">
              Weight
            </label>{" "}
            <input name="Weight" type="text" className="exercise-input" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Logger;
