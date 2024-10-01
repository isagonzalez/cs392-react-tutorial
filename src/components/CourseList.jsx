import "./CourseList.css";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.values(courses).map((course) => (
      <CourseCard key={course.number} course={course} />
    ))}
  </div>
);

export default CourseList;
