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

  const [showDescriptions, setShowDescriptions] = useState(false);

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
      const updatedList = [...exerciseList];
      const rowElement = document.getElementById(`exercise-row-${index}`);

      rowElement.classList.add("fade-out");
      setTimeout(() => {
        updatedList.splice(index, 1);
        setExerciseList(updatedList);
      }, 500); // Match the duration of the fade-out animation
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
      <div className="ts-form-2 logger-container">
        {!workoutInfo.formCompleted ? (
          <div>
            <h1 className="t-center white">Logger</h1>
            <form className="ts-form" onSubmit={handleWorkoutInfoSubmit}>
              <div className="input-container">
                <label htmlFor="workoutName">Name Today's Workout!</label>
                <input
                  name="workoutName"
                  id="workoutName"
                  type="text"
                  value={workoutInfo.name}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
              </div>
              <div className="input-container">
                <label htmlFor="typeName">
                  What type of workout are we hitting today?
                </label>
                <input
                  name="typeName"
                  id="typeName"
                  type="text"
                  value={workoutInfo.typeName}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
              </div>
              <button className="btn-ts-1" type="submit">
                Start Workout
              </button>
            </form>
          </div>
        ) : (
          <>
            <div id="masterList" className="logger-container">
              <h2 className="t-center white logger-header">
                {workoutInfo.name}
              </h2>
              <h2 className="t-center white logger-header">
                {workoutInfo.typeName} Day
              </h2>
              {exerciseList.map((exercise, index) => (
                <div
                  key={index}
                  id={`exercise-row-${index}`}
                  className="inputs-container"
                >
                  <div className="input-container">
                    <label htmlFor={`ExerciseName${index}`}>
                      Exercise Name
                    </label>
                    <input
                      name={`ExerciseName${index}`}
                      type="text"
                      className="exercise-input"
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
                      className="exercise-input"
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
                      className="exercise-input"
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
            {showDescriptions && (
              <div className="description-popup">
                <h3>Button Descriptions</h3>
                <ul>
                  <li>
                    <strong className="btn-new-set">New Set:</strong> Add a new
                    empty exercise set.
                  </li>
                  <li>
                    <strong className="btn-dupe-set">Duplicate Set:</strong>{" "}
                    Duplicate the last entered exercise set.
                  </li>
                  <li>
                    <strong className="btn-delete-set">Delete Last Set:</strong>{" "}
                    Delete the last exercise set.
                  </li>
                  <li>
                    <strong className="btn-download-set">Download CSV:</strong>{" "}
                    Download the workout data as a CSV file.
                  </li>
                </ul>
                <button
                  className="btn-close-description"
                  onClick={() => setShowDescriptions(false)}
                >
                  Close
                </button>
              </div>
            )}
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
            </div>
          </>
        )}
        {workoutInfo.formCompleted && (
          <div className="btn-container">
            <button className="btn-download-set set-btns" onClick={generateCSV}>
              Download CSV
            </button>
            <button
              className="btn-description set-btns"
              onClick={() => setShowDescriptions(true)}
            >
              Show Descriptions
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Logger;
