import "./CourseForm.css";
import { parseDays } from "../utilities/scheduleUtils";
import { useFormData } from "../utilities/useFormData";
import { useDbUpdate } from "../utilities/firebase";

const validateForm = (key, val) => {
  switch (key) {
    case "title":
      return val.length >= 2 ? "" : "Title must be at least 2 characters";
    case "courseNumber":
      return /^\d+(-\d+)?$/.test(val) ? "" : "Invalid course number format";
    case "meetingDays":
      return val.length > 0 ? "" : "Must select at least one meeting day";
    default:
      return "";
  }
};

const InputField = ({ name, label, type = "text", state, change }) => (
  <div className="field">
    <label htmlFor={name}>{label}</label>
    <input
      className="form-control"
      id={name}
      value={state.values?.[name]}
      onChange={change}
      type={type}
    />
    {state.errors?.[name] && (
      <div className="error">
        <span className="material-symbols-rounded">error</span>
        <p className="error-message">{state.errors[name]}</p>
      </div>
    )}
  </div>
);

const SelectField = ({ name, label, options, state, change }) => (
  <div className="field">
    <label htmlFor={name}>{label}</label>
    <select
      className="form-control"
      id={name}
      value={state.values?.[name]}
      onChange={change}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxGroup = ({ name, label, options, state, change }) => {
  const handleCheckboxChange = (day) => {
    const selectedDays = state.values?.[name] || [];
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    change({
      target: { id: name, value: updatedDays },
    });
  };

  return (
    <div className="field">
      <label>{label}</label>
      <div className="meeting-days">
        {options.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              checked={state.values?.[name]?.includes(day)}
              onChange={() => handleCheckboxChange(day)}
            />
            {day}
          </label>
        ))}
      </div>
      {state.errors?.[name] && (
        <div className="error">
          <span className="material-symbols-rounded">error</span>
          <p className="error-message">{state.errors[name]}</p>
        </div>
      )}
    </div>
  );
};

const ButtonBar = ({ message, disabled, onCancel }) => (
  <div>
    <div className="actions">
      <button className="cancel" type="button" onClick={onCancel}>
        Cancel
      </button>
      <button className="submit" type="submit" disabled={disabled}>
        Submit
      </button>
    </div>
    <span>{message}</span>
  </div>
);

const CourseForm = ({ course, onCancel }) => {
  const courseID = `${course.term[0]}${course.number}`;
  const [update, result] = useDbUpdate(`/courses/${courseID}`);
  const [state, change] = useFormData(validateForm, {
    title: course?.title || "",
    courseNumber: course?.number || "",
    term: course?.term || "Fall",
    meetingDays: course ? parseDays(course.meets.split(" ")[0]) : [],
    startTime: course ? course.meets.split(" ")[1].split("-")[0] : "",
    endTime: course ? course.meets.split(" ")[1].split("-")[1] : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dayOrder = ["M", "Tu", "W", "Th", "F"];

    const sortedMeetingDays = [...state.values.meetingDays].sort(
      (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
    );

    const meets = `${sortedMeetingDays.join("")} ${state.values.startTime}-${
      state.values.endTime
    }`;

    const updatedCourse = {
      meets: meets,
      number: state.values.courseNumber,
      term: state.values.term,
      title: state.values.title,
    };

    update(updatedCourse);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={state.errors ? "was-validated" : ""}
    >
      <h2>Edit Course</h2>

      <InputField
        name="title"
        label="Course Title"
        state={state}
        change={change}
      />

      <InputField
        name="courseNumber"
        label="Course Number"
        state={state}
        change={change}
      />

      <SelectField
        name="term"
        label="Term"
        options={["Fall", "Winter", "Spring"]}
        state={state}
        change={change}
      />

      <CheckboxGroup
        name="meetingDays"
        label="Meeting Days"
        options={["M", "Tu", "W", "Th", "F"]}
        state={state}
        change={change}
      />

      <InputField
        name="startTime"
        label="Start Time"
        type="time"
        state={state}
        change={change}
      />

      <InputField
        name="endTime"
        label="End Time"
        type="time"
        state={state}
        change={change}
      />

      <ButtonBar
        message={result?.message}
        disabled={!!state.errors}
        onCancel={onCancel}
      />
    </form>
  );
};

export default CourseForm;
