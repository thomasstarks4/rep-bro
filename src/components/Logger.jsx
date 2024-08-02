function Logger() {
  return (
    <div className="logger-container">
      <h1>Logger</h1>
      <div className="inputs-container">
        {/* Exercise Type Input */}
        <div className="input-container">
          <label htmlFor="ExerciseType">Exercise Type</label>
          <input name="ExerciseType" type="text" className="exercise-input" />
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
          <input type="checkbox" />
          <input name="Weight" type="text" className="exercise-input" />
        </div>
      </div>
    </div>
  );
}

export default Logger;
