import "./CourseList.css";
import CourseCard from "./CourseCard";
import { useState } from "react";

const CourseList = ({
  courses,
  selectedTerm,
  selectedCourses,
  setSelectedCourses,
}) => {
  const toggleCourseSelection = (course) => {
    const isSelected = selectedCourses.some(
      (selectedCourse) =>
        selectedCourse.term === course.term &&
        selectedCourse.number === course.number
    );

    if (isSelected) {
      setSelectedCourses(
        selectedCourses.filter(
          (selectedCourse) =>
            selectedCourse.term !== course.term ||
            selectedCourse.number !== course.number
        )
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
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
          isSelected={selectedCourses.some(
            (selectedCourse) =>
              selectedCourse.term === course.term &&
              selectedCourse.number === course.number
          )}
          toggleCourseSelection={toggleCourseSelection}
        />
      ))}
    </div>
  );
};

export default CourseList;
