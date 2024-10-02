import "./CourseList.css";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, selectedTerm }) => {
  const filteredCourses =
    selectedTerm === "All"
      ? Object.values(courses)
      : Object.values(courses).filter((course) => course.term === selectedTerm);

  return (
    <div className="course-list">
      {filteredCourses.map((course) => (
        <CourseCard key={`${course.term}${course.number}`} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
