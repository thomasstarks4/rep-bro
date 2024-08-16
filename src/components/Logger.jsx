import "./css/Logger.css";
import { useState, useMemo } from "react";
// Main component of app, handles sets.
function Logger() {
  const getCurrentDayAndDate = useMemo(() => {
    //for default workout name.
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
  }, []);

  const tempName = `${getCurrentDayAndDate}'s Workout`;
  const [workoutInfo, setWorkoutInfo] = useState({
    workoutName: tempName,
    typeName: "Strength Training",
    formCompleted: false,
    isPlanned: false,
  });

  const initialList = [{ exerciseName: "", numberOfReps: "", weight: "" }];
  const [exerciseList, setExerciseList] = useState(initialList);

  const [showDescriptions, setShowDescriptions] = useState(false);

  const handleWorkoutInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkoutInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
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

  const deleteRow = (index, bLastSet) => {
    bLastSet = bLastSet || false;
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmed) {
      const updatedList = [...exerciseList];
      const rowElement = document.getElementById(`exercise-row-${index}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");
        setTimeout(() => {
          updatedList.splice(index, 1);
          setExerciseList(updatedList);
          checkForFadeOuts();
        }, 500); // Match the duration of the fade-out animation
      }
    }
  };

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Workout Name,${workoutInfo.workoutName}\n`;
    csvContent += `Workout Type,${workoutInfo.typeName}\n\n`;
    csvContent += "Exercise Name,Number of Reps,Weight\n";

    exerciseList.forEach((exercise) => {
      csvContent += `${exercise.exerciseName},${exercise.numberOfReps},${exercise.weight}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${workoutInfo.workoutName}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link); // Clean up
  };

  //Ensures no extra elements get the class added
  const checkForFadeOuts = () => {
    const fadeOutElements = document.getElementsByClassName("fade-out");
    Array.from(fadeOutElements).forEach((element) => {
      element.classList.remove("fade-out");
    });
  };

  return (
    <>
      <div className="ts-form-2 logger-container">
        {!workoutInfo.formCompleted ? (
          //Pre-Logger Information Form
          <div>
            <h1 className="t-center white">Logger</h1>
            <form className="ts-form" onSubmit={handleWorkoutInfoSubmit}>
              <div className="input-container">
                <label htmlFor="workoutName">Name Today's Workout!</label>
                <input
                  name="workoutName"
                  id="workoutName"
                  type="text"
                  value={workoutInfo.workoutName}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
              </div>
              <div className="input-container">
                <label className="md-label" htmlFor="typeName">
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
              <div className="md-label">
                <small>
                  Planned Workout?(adds checkboxes to help track your sets as
                  you complete them)
                </small>
                <input
                  name="isPlanned"
                  id="isPlanned"
                  type="checkbox"
                  checked={workoutInfo.isPlanned}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
                <button className="btn-ts-1" type="submit">
                  Start Workout
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* The Logger */}
            <div id="masterList" className="logger-container">
              <h2 className="t-center white logger-header">
                {workoutInfo.workoutName}
              </h2>
              <h2 className="t-center white logger-header">
                {workoutInfo.typeName}
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
                      id={`ExerciseName${index}`}
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
                      id={`NumberOfReps${index}`}
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
                      id={`Weight${index}`}
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
                  {workoutInfo.isPlanned && (
                    <div className="input-container">
                      <>
                        <label
                          htmlFor={`ExerciseName${index}`}
                          className="checkbox-label"
                        >
                          Completed
                        </label>
                        <input
                          name={`ExerciseName${index}`}
                          id={`ExerciseName${index}`}
                          type="checkbox"
                          style={{
                            transform: "scale(1.5)",
                            marginRight: "10px",
                          }}
                        />
                      </>
                    </div>
                  )}
                  <button
                    className="btn-delete-set set-btns"
                    onClick={() => deleteRow(index, false)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="btn-container">
                <button
                  className="btn-new-set set-btns"
                  onClick={addExerciseRow}
                >
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
                  onClick={() => deleteRow(exerciseList.length - 1, true)}
                >
                  Delete Last Set
                </button>
                <button
                  className="btn-download-set set-btns"
                  onClick={generateCSV}
                >
                  Download CSV
                </button>
                <button
                  className="btn-description set-btns"
                  onClick={() => setShowDescriptions(true)}
                >
                  Show Descriptions
                </button>
              </div>
              {/* end of logger container */}
            </div>
          </>
        )}
        {showDescriptions && (
          <div className="description-popup">
            <h3>Button Descriptions</h3>
            <ul>
              <li>
                <strong className="btn-new-set">New Set</strong>
                <br /> Add a new empty exercise set.
              </li>
              <li>
                <strong className="btn-dupe-set">
                  Duplicate Set
                  <br />
                </strong>{" "}
                Duplicate the last entered exercise set.
              </li>
              <li>
                <strong className="btn-delete-set">
                  Delete Last Set
                  <br />
                </strong>{" "}
                Delete the last exercise set.
              </li>
              <li>
                <strong className="btn-download-set">
                  Download CSV
                  <br />
                </strong>{" "}
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
      </div>
    </>
  );
}

export default Logger;
