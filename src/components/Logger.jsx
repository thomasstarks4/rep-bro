import "./css/Logger.css";
import { useState, useMemo } from "react";
import SessionTimer from "./SessionTimer";

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

  const tempWorkoutName = `${getCurrentDayAndDate}'s Workout`;
  const [workoutInfo, setWorkoutInfo] = useState({
    workoutName: tempWorkoutName,
    typeName: "Strength Training",
    formCompleted: false,
    isPlanned: false,
    isTimed: true,
  });

  const [workoutSets, setWorkoutSets] = useState([
    { type: "exercise", exerciseName: "", numberOfReps: "", weight: "" },
  ]);

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

  const duplicateLastRow = () => {
    if (workoutSets.length > 0) {
      const lastRow = workoutSets[workoutSets.length - 1];
      setWorkoutSets([...workoutSets, { ...lastRow }]);
    }
  };

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
        }, 500);
      }
    }
  };

  const generateTextFile = () => {
    let textContent = `Workout Name: ${workoutInfo.workoutName}\n`;
    textContent += `Workout Type: ${workoutInfo.typeName}\n\n`;
    textContent += "Type | Name | Reps/Time | Weight/Intensity\n";
    textContent += "------------------------------------------\n";

    workoutSets.forEach((set) => {
      if (set.type === "exercise") {
        textContent += `Exercise | ${set.exerciseName} | ${set.numberOfReps} | ${set.weight}\n`;
      } else if (set.type === "cardio") {
        textContent += `Cardio | ${set.cardioName} | ${set.time} | ${set.intensity}\n`;
      }
    });

    const encodedUri = encodeURI(
      `data:text/plain;charset=utf-8,${textContent}`
    );
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${workoutInfo.workoutName}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // New function to handle loading a workout from a text file
  const handleLoadWorkout = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").map((line) => line.trim());

      let newWorkoutInfo = { ...workoutInfo };
      let newWorkoutSets = [];

      // Parse workout info (first two lines)
      newWorkoutInfo.workoutName = lines[0].split(":")[1].trim();
      newWorkoutInfo.typeName = lines[1].split(":")[1].trim();
      
      //Adds the checkbox to help track completed sets
      newWorkoutInfo.isPlanned = true

      // Parse workout sets
      for (let i = 4; i < lines.length; i++) {
        if (lines[i]) {
          const [type, name, repsTime, weightIntensity] = lines[i]
            .split("|")
            .map((item) => item.trim());

          if (type === "Exercise") {
            newWorkoutSets.push({
              type: "exercise",
              exerciseName: name,
              numberOfReps: repsTime,
              weight: weightIntensity,
            });
          } else if (type === "Cardio") {
            newWorkoutSets.push({
              type: "cardio",
              cardioName: name,
              time: parseInt(repsTime, 10),
              intensity: weightIntensity,
              timerRunning: false,
            });
          }
        }
      }

      // Update state
      setWorkoutInfo(newWorkoutInfo);
      setWorkoutSets(newWorkoutSets);
    };

    reader.readAsText(file);
  };

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
                          className="exercise-input"
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
                  {workoutInfo.isPlanned && (<div className="checkbox-container"><label>Done?</label><input type="checkbox" /></div>)}
                  <button
                    className="btn-delete-set "
                    onClick={() => deleteRow(index)}
                  >
                    {workoutInfo.isPlanned ? "Skip" : "Delete"}
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
                  {workoutInfo.isPlanned ? "Skip" : "Delete"} Last Set
                  <br />
                </strong>{" "}
                Delete the last exercise set. Says "Skip" if the workout is planned, "Delete" otherwise.
              </li>
              <li>
                <strong className="btn-download-set">
                  Download To Text File
                  <br />
                </strong>{" "}
                Download the workout data as a text file. Do not modify the file if you wish to upload use it again for uploading here. Create a copy of the file instead.
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

      {/* Add file input for loading a workout from text file */}
      {workoutInfo.formCompleted && (
        <div className="btn-container">
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
            {workoutInfo.isPlanned ? "Skip" : "Delete"} Last Set
          </button>
          <button
            className="btn-download-set set-btns"
            onClick={generateTextFile}
          >
            Download To Text File
          </button>
          <button
            className="btn-description set-btns"
            onClick={() => setShowDescriptions(true)}
          >
            Show Descriptions
          </button>

          <div className="upload-container">
            <label htmlFor="file-upload" className="custom-file-upload">
              Upload Workout
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".txt"
              onChange={handleLoadWorkout}
              className="btn-upload-set"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Logger;
