import "./CourseList.css";
import CourseCard from "./CourseCard";
import { useState } from "react";

const CourseList = ({ courses, selectedTerm }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourseSelection = (course) => {
    const courseId = `${course.term}-${course.number}`;
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const filteredCourses =
    selectedTerm === "All"
      ? Object.values(courses)
      : Object.values(courses).filter((course) => course.term === selectedTerm);

  return (
    <div className="course-list">
      {filteredCourses.map((course) => (
        <CourseCard
          key={`${course.term}${course.number}`}
          course={course}
          isSelected={selectedCourses.includes(
            `${course.term}-${course.number}`
          )}
          toggleCourseSelection={toggleCourseSelection}
        />
      ))}
    </div>
  );
};

export default CourseList;
