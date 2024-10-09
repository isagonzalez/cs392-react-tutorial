import "./CourseCard.css";

const CourseCard = ({ course, isSelected, canTake, toggleCourseSelection }) => (
  <div
    className={`course-card ${isSelected ? "selected" : ""} ${
      !canTake && !isSelected ? "conflict" : ""
    }`}
    onClick={() => toggleCourseSelection(course)}
  >
    <div className="main-info">
      <h2>
        {course.term} CS {course.number}
      </h2>
      <p>{course.title}</p>
    </div>
    <div className="meeting-time">
      <p>{course.meets}</p>
    </div>
  </div>
);

export default CourseCard;
