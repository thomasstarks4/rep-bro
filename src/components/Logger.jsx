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
    typeName: "Strength Training",
    formCompleted: false,
  });

  const [exerciseList, setExerciseList] = useState([
    { exerciseName: "", numberOfReps: "", weight: "" },
  ]);

  const handleWorkoutInfoChange = (e) => {
    const { name, value } = e.target;
    setWorkoutInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleWorkoutInfoSubmit = (e) => {
    e.preventDefault();
    setWorkoutInfo((prevInfo) => ({
      ...prevInfo,
      formCompleted: true,
    }));
  };

  const addExerciseRow = () => {
    setExerciseList([
      ...exerciseList,
      { exerciseName: "", numberOfReps: "", weight: "" },
    ]);
  };

  const duplicateLastRow = () => {
    if (exerciseList.length > 0) {
      const lastRow = exerciseList[exerciseList.length - 1];
      setExerciseList([...exerciseList, { ...lastRow }]);
    }
  };

  const deleteRow = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmed) {
      setExerciseList(exerciseList.filter((_, i) => i !== index));
    }
  };

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Workout Name,${workoutInfo.name}\n`;
    csvContent += `Workout Type,${workoutInfo.typeName}\n\n`;
    csvContent += "Exercise Name,Number of Reps,Weight\n";

    exerciseList.forEach((exercise) => {
      csvContent += `${exercise.exerciseName},${exercise.numberOfReps},${exercise.weight}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "workout_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link); // Clean up
  };

  return (
    <>
      <div>
        {!workoutInfo.formCompleted ? (
          <form onSubmit={handleWorkoutInfoSubmit}>
            <div className="input-container">
              <label htmlFor="workoutName">Workout Name</label>
              <input
                name="name"
                type="text"
                value={workoutInfo.name}
                onChange={handleWorkoutInfoChange}
                className="exercise-input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="typeName">Type of Workout</label>
              <input
                name="typeName"
                type="text"
                value={workoutInfo.typeName}
                onChange={handleWorkoutInfoChange}
                className="exercise-input"
              />
            </div>
            <button type="submit">Start Workout</button>
          </form>
        ) : (
          <>
            <div className="btn-container">
              <button className="btn-new-set set-btns" onClick={addExerciseRow}>
                New Set
              </button>
              <button
                className="btn-dupe-set set-btns"
                onClick={duplicateLastRow}
              >
                Duplicate Set
              </button>
              <button
                className="btn-delete-set set-btns"
                onClick={() => deleteRow(exerciseList.length - 1)}
              >
                Delete Last Set
              </button>
              <button
                className="btn-download-set set-btns"
                onClick={generateCSV}
              >
                Download CSV
              </button>
            </div>
            <h1 className="t-center white">Logger</h1>
            <div id="masterList" className="logger-container">
              <h1 className="t-center white">{workoutInfo.name}</h1>
              <h2 className="t-center white">{workoutInfo.typeName} Day</h2>
              {exerciseList.map((exercise, index) => (
                <div key={index} className="inputs-container">
                  <div className="input-container">
                    <label htmlFor={`ExerciseName${index}`}>
                      Exercise Name
                    </label>
                    <input
                      name={`ExerciseName${index}`}
                      type="text"
                      className="exercise-input input-1"
                      value={exercise.exerciseName}
                      onChange={(e) => {
                        const newList = [...exerciseList];
                        newList[index].exerciseName = e.target.value;
                        setExerciseList(newList);
                      }}
                    />
                  </div>
                  <div className="input-container">
                    <label
                      htmlFor={`NumberOfReps${index}`}
                      className="exercise-label"
                    >
                      Number Of Reps
                    </label>
                    <input
                      name={`NumberOfReps${index}`}
                      type="text"
                      className="exercise-input input-1"
                      value={exercise.numberOfReps}
                      onChange={(e) => {
                        const newList = [...exerciseList];
                        newList[index].numberOfReps = e.target.value;
                        setExerciseList(newList);
                      }}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor={`Weight${index}`} className="Weight">
                      Weight
                    </label>{" "}
                    <input
                      name={`Weight${index}`}
                      type="text"
                      className="exercise-input input-1"
                      value={exercise.weight}
                      onChange={(e) => {
                        const newList = [...exerciseList];
                        newList[index].weight = e.target.value;
                        setExerciseList(newList);
                      }}
                    />
                  </div>
                  <button
                    className="btn-delete-set set-btns"
                    onClick={() => deleteRow(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Logger;
