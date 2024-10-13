import "./CoursePlan.css";

const CoursePlan = ({ selectedCourses }) => (
  <div className="course-plan">
    <h2>Course Plan</h2>
    {selectedCourses.length === 0 ? (
      <div>
        <strong>No courses selected</strong>
        <p>Click on a course to add it to your plan.</p>
      </div>
    ) : (
      selectedCourses.map((course, index) => (
        <div key={index} className="course-item">
          <strong>
            {course.term} CS {course.number}
          </strong>{" "}
          - {course.title} <br />
          <em>{course.meets}</em>
        </div>
      ))
    )}
  </div>
);

export default CoursePlan;
