import "./CourseCard.css";

const CourseCard = ({ course }) => (
  <div className="course-card">
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
