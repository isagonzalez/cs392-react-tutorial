// import css

const CourseList = ({ courses }) => (
  <div>
    {Object.values(courses).map((course) => (
      <p key={course.number}>
        {course.term} CS {course.number}: {course.title}
      </p>
    ))}
  </div>
);

export default CourseList;
