import "./CourseList.css";
import CourseCard from "./CourseCard";
import { hasTimeConflict } from "../utilities/scheduleUtils";

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
      const hasConflict = selectedCourses.some((selectedCourse) =>
        hasTimeConflict(selectedCourse, course)
      );

      if (!hasConflict) {
        setSelectedCourses([...selectedCourses, course]);
      } else {
        console.log(
          `Cannot select ${course.term} CS ${course.number} due to time conflict.`
        );
      }
    }
  };

  const filteredCourses =
    selectedTerm === "All"
      ? Object.values(courses)
      : Object.values(courses).filter((course) => course.term === selectedTerm);

  return (
    <div className="course-list">
      {filteredCourses.map((course) => {
        let isSelected = selectedCourses.some(
          (selectedCourse) =>
            selectedCourse.term === course.term &&
            selectedCourse.number === course.number
        );

        let hasConflict = selectedCourses.some((selectedCourse) =>
          hasTimeConflict(selectedCourse, course)
        );

        const canTake = !isSelected && !hasConflict;

        return (
          <CourseCard
            key={`${course.term}${course.number}`}
            course={course}
            isSelected={isSelected}
            canTake={canTake}
            toggleCourseSelection={toggleCourseSelection}
          />
        );
      })}
    </div>
  );
};

export default CourseList;
