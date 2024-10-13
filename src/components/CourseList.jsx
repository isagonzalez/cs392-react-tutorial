import "./CourseList.css";
import { hasTimeConflict } from "../utilities/scheduleUtils";
import { Link } from "react-router-dom";

const CourseList = ({
  courses,
  selectedTerm,
  selectedCourses,
  setSelectedCourses,
  profile,
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

  return (
    <div className="course-list">
      {Object.entries(courses)
        .filter(([courseID, course]) =>
          selectedTerm === "All" ? true : course.term === selectedTerm
        )
        .map(([courseID, course]) => {
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
            <div
              key={courseID}
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

              {profile?.isAdmin && (
                <Link
                  to={`/edit/${courseID}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="edit-button">
                    <span className="material-symbols-rounded">edit</span>
                  </button>
                </Link>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CourseList;
