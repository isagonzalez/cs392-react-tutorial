import "./CourseForm.css";
import { useState, useEffect } from "react";
import { parseDays } from "../utilities/scheduleUtils";

const CourseForm = ({ course, onCancel }) => {
  const [title, setTitle] = useState(course ? course.title : "");
  const [courseNumber, setCourseNumber] = useState(course ? course.number : "");
  const [term, setTerm] = useState(course ? course.term : "Fall");
  const [meetingDays, setMeetingDays] = useState(
    course ? parseDays(course.meets.split(" ")[0]) : []
  );
  const [startTime, setStartTime] = useState(
    course ? course.meets.split(" ")[1].split("-")[0] : ""
  );
  const [endTime, setEndTime] = useState(
    course ? course.meets.split(" ")[1].split("-")[1] : ""
  );

  const [errors, setErrors] = useState({
    title: "",
    courseNumber: "",
    meetingDays: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form is valid");
    }
  };

  const handleDayChange = (day) => {
    setMeetingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  useEffect(() => {
    console.log("Form updated");
    validateForm();
  }, [title, courseNumber, meetingDays]);

  const validateForm = () => {
    console.log("Validating form");
    console.log(title, courseNumber, meetingDays);
    const formErrors = { title: "", courseNumber: "", meetingDays: "" };

    if (title.length < 2) {
      formErrors.title = "Title must be at least 2 characters";
    }

    const courseNumberFormat = /^\d+(-\d+)?$/;
    if (!courseNumber.match(courseNumberFormat)) {
      formErrors.courseNumber = "Invalid course number format";
    }

    if (meetingDays.length === 0) {
      formErrors.meetingDays = "Must select at least one meeting day";
    }

    setErrors(formErrors);

    console.log(errors);

    return Object.values(formErrors).every((error) => error === "");
  };

  return (
    <div className="edit-form">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Course Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title.length > 0 && (
            <div className="error">
              <span className="material-symbols-rounded">error</span>
              <p className="error-message">{errors.title}</p>
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="courseNumber">Course Number</label>
          <input
            type="text"
            id="courseNumber"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
          />
          {errors.courseNumber.length > 0 && (
            <div className="error">
              <span className="material-symbols-rounded">error</span>
              <p className="error-message">{errors.courseNumber}</p>
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="term">Term</label>
          <select
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
        </div>

        <div className="field">
          <label>Meeting Days</label>
          <div className="meeting-days">
            {["M", "Tu", "W", "Th", "F"].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  value={day}
                  checked={meetingDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
          {errors.meetingDays.length > 0 && (
            <div className="error">
              <span className="material-symbols-rounded">error</span>
              <p className="error-message">{errors.meetingDays}</p>
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
