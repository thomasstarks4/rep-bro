import "./css/Logger.css";
import { useState, useMemo } from "react";
import SessionTimer from "./SessionTimer";

// Main component of app, handles sets.
function Logger() {
  const getCurrentDayAndDate = useMemo(() => {
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
  //temporary name for the workout using today's date.
  const tempWorkoutName = `${getCurrentDayAndDate}'s Workout`;
  const [workoutInfo, setWorkoutInfo] = useState({
    workoutName: tempWorkoutName,
    typeName: "Strength Training",
    formCompleted: false,
    isPlanned: false,
    isTimed: true,
  });

  // Unified list to hold both exercise and cardio sets.
  const [workoutSets, setWorkoutSets] = useState([
    { type: "exercise", exerciseName: "", numberOfReps: "", weight: "" }, // example of exercise set
  ]);

  //State to show and hide button descriptions
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

  // Function to add a new row (either exercise or cardio)
  const addExerciseRow = (rowType) => {
    const newRow =
      rowType === "exercise"
        ? { type: "exercise", exerciseName: "", numberOfReps: "", weight: "" }
        : {
            type: "cardio",
            cardioName: "",
            time: 0,
            intensity: "",
            timerRunning: false,
          };

    setWorkoutSets([...workoutSets, newRow]);
  };

  // Function to duplicate the last row (whether exercise or cardio)
  const duplicateLastRow = () => {
    if (workoutSets.length > 0) {
      const lastRow = workoutSets[workoutSets.length - 1];
      setWorkoutSets([...workoutSets, { ...lastRow }]);
    }
  };

  // Function to delete a row by index
  const deleteRow = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmed) {
      const updatedList = [...workoutSets];
      const rowElement = document.getElementById(`workout-row-${index}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");
        setTimeout(() => {
          updatedList.splice(index, 1);
          setWorkoutSets(updatedList);
          checkForFadeOuts();
        }, 500); // Match the duration of the fade-out animation
      }
    }
  };

  // Toggle timer for cardio sets
  const toggleTimer = (index) => {
    setWorkoutSets((prevList) => {
      const updatedList = [...prevList];
      const cardioItem = updatedList[index];
      cardioItem.timerRunning = !cardioItem.timerRunning;

      if (cardioItem.timerRunning) {
        cardioItem.timerInterval = setInterval(() => {
          setWorkoutSets((prevList) => {
            const updated = [...prevList];
            updated[index].time += 1;
            return updated;
          });
        }, 1000);
      } else {
        clearInterval(cardioItem.timerInterval);
      }

      return updatedList;
    });
  };

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Workout Name,${workoutInfo.workoutName}\n`;
    csvContent += `Workout Type,${workoutInfo.typeName}\n\n`;
    csvContent += "Type,Name,Reps/Time,Weight/Intensity\n";

    workoutSets.forEach((set) => {
      if (set.type === "exercise") {
        csvContent += `Exercise,${set.exerciseName},${set.numberOfReps},${set.weight}\n`;
      } else if (set.type === "cardio") {
        csvContent += `Cardio,${set.cardioName},${set.time},${set.intensity}\n`;
      }
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${workoutInfo.workoutName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ensures no extra elements get the class added
  const checkForFadeOuts = () => {
    const fadeOutElements = document.getElementsByClassName("fade-out");
    Array.from(fadeOutElements).forEach((element) => {
      element.classList.remove("fade-out");
    });
  };

  const calculateTime = (time = 0) => {
    let hours = 0;
    let minutes = 0;
    let seconds = time;
    while (seconds >= 60) {
      seconds -= 60;
      minutes += 1;
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
    }
    return `${hours >= 10 ? hours.toString() : "0" + hours.toString()}:${
      minutes >= 10 ? minutes.toString() : "0" + minutes.toString()
    }:${seconds >= 10 ? seconds.toString() : "0" + seconds.toString()}`;
  };
  return (
    <>
      {workoutInfo.isTimed && workoutInfo.formCompleted && <SessionTimer />}
      <div className="ts-form-2 logger-container">
        {!workoutInfo.formCompleted ? (
          <div>
            <h1 className="t-center white m-0">Logger</h1>
            <form className="ts-form" onSubmit={handleWorkoutInfoSubmit}>
              <div className="input-container-2">
                <label htmlFor="workoutName">Workout Name</label>
                <input
                  name="workoutName"
                  id="workoutName"
                  type="text"
                  value={workoutInfo.workoutName}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
              </div>
              <div className="input-container-2">
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
                <input
                  name="isPlanned"
                  id="isPlanned"
                  type="checkbox"
                  checked={workoutInfo.isPlanned}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
                <small>
                  Planned Workout? <br />
                  (adds checkboxes to help track your sets as you complete them)
                </small>
              </div>
              <div className="md-label">
                <input
                  name="isTimed"
                  id="isTimed"
                  type="checkbox"
                  checked={workoutInfo.isTimed}
                  onChange={handleWorkoutInfoChange}
                  className="exercise-input"
                />
                <small>
                  Time Your Workout? <br />
                  (Adds a session timer so you can track how long your total
                  workout was. Timer starts as soon as you hit "Start Workout")
                </small>
              </div>
              <button className="btn-ts-1" type="submit">
                Start Workout
              </button>
            </form>
            <h1 className="invisible m-0">Logger</h1>
          </div>
        ) : (
          <>
            <h2 className="t-center white logger-header">
              {workoutInfo.workoutName}
            </h2>
            <h2 className="t-center white logger-header">
              {workoutInfo.typeName}
            </h2>
            <div id="masterList" className="logger-container">
              {workoutSets.map((set, index) => (
                <div
                  key={index}
                  id={`workout-row-${index}`}
                  className="exercise-set"
                >
                  {set.type === "exercise" ? (
                    <>
                      <div className="input-container">
                        <label htmlFor={`ExerciseName${index}`}>
                          Exercise Name
                        </label>
                        <input
                          name={`ExerciseName${index}`}
                          id={`ExerciseName${index}`}
                          type="text"
                          className="exercise-input"
                          value={set.exerciseName}
                          onChange={(e) => {
                            const updatedList = [...workoutSets];
                            updatedList[index].exerciseName = e.target.value;
                            setWorkoutSets(updatedList);
                          }}
                        />
                      </div>
                      <div className="input-container">
                        <label htmlFor={`NumberOfReps${index}`}>
                          Number Of Reps
                        </label>
                        <input
                          name={`NumberOfReps${index}`}
                          id={`NumberOfReps${index}`}
                          type="text"
                          className="exercise-input"
                          value={set.numberOfReps}
                          onChange={(e) => {
                            const updatedList = [...workoutSets];
                            updatedList[index].numberOfReps = e.target.value;
                            setWorkoutSets(updatedList);
                          }}
                        />
                      </div>
                      <div className="input-container">
                        <label htmlFor={`Weight${index}`}>Weight</label>
                        <input
                          name={`Weight${index}`}
                          id={`Weight${index}`}
                          type="text"
                          className="exercise-input text-lg"
                          value={set.weight}
                          onChange={(e) => {
                            const updatedList = [...workoutSets];
                            updatedList[index].weight = e.target.value;
                            setWorkoutSets(updatedList);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="input-container">
                        <label htmlFor={`CardioName${index}`}>
                          Cardio Name
                        </label>
                        <input
                          name={`CardioName${index}`}
                          id={`CardioName${index}`}
                          type="text"
                          className="cardio-input"
                          value={set.cardioName}
                          onChange={(e) => {
                            const updatedList = [...workoutSets];
                            updatedList[index].cardioName = e.target.value;
                            setWorkoutSets(updatedList);
                          }}
                        />
                      </div>
                      <div className="input-container">
                        <label htmlFor={`CardioTime${index}`}>
                          Time: {calculateTime(set.time)}
                        </label>

                        <button onClick={() => toggleTimer(index)}>
                          {set.timerRunning ? "Stop" : "Start"} Timer
                        </button>
                      </div>
                      <div className="input-container">
                        <label htmlFor={`Intensity${index}`}>Intensity</label>
                        <input
                          name={`Intensity${index}`}
                          type="text"
                          className="cardio-input"
                          value={set.intensity}
                          onChange={(e) => {
                            const updatedList = [...workoutSets];
                            updatedList[index].intensity = e.target.value;
                            setWorkoutSets(updatedList);
                          }}
                        />
                      </div>
                    </>
                  )}
                  <button
                    className="btn-delete-set "
                    onClick={() => deleteRow(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
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
      {workoutInfo.formCompleted && (
        <div className={`btn-container`}>
          <button
            className="btn-new-set set-btns"
            onClick={function () {
              addExerciseRow("exercise");
            }}
          >
            New Set
          </button>
          <button
            className="btn-new-cardio-set set-btns"
            onClick={function () {
              addExerciseRow("cardio");
            }}
          >
            New Cardio Set
          </button>

          <button className="btn-dupe-set set-btns" onClick={duplicateLastRow}>
            Duplicate Set
          </button>
          <button
            className="btn-delete-set set-btns"
            onClick={() => deleteRow(workoutSets.length - 1, true)}
          >
            Delete Last Set
          </button>
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
    </>
  );
}

export default Logger;
