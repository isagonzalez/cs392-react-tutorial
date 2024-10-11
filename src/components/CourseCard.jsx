import "./CourseCard.css";
import { useState } from "react";

const CourseCard = ({
  course,
  isSelected,
  canTake,
  toggleCourseSelection,
  startEditing,
}) => {
  return (
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

      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation();
          startEditing(course);
        }}
      >
        <span className="material-symbols-rounded">edit</span>
      </button>
    </div>
  );
};

export default CourseCard;
