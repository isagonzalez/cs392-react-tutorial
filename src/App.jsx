import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useJsonQuery } from "./utilities/fetch";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import TermSelector from "./components/TermSelector";
import Modal from "./components/Modal";
import CoursePlan from "./components/CoursePlan";
import CourseForm from "./components/CourseForm";

const terms = ["All", "Fall", "Winter", "Spring"];

const Main = () => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const startEditing = (course) => {
    setEditingCourse(course);
  };

  const stopEditing = (course) => {
    setEditingCourse(null);
  };

  const [data, isLoading, error] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!data) return <h1>No schedule data found</h1>;

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="main-content">
      <Banner title={data.title} />
      <div className="top-bar">
        <TermSelector
          terms={terms}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <button className="modal-btn" onClick={openModal}>
          <span className="material-symbols-rounded">collections_bookmark</span>
          <p>Course Plan</p>
        </button>
      </div>

      <Modal open={open} close={closeModal}>
        <CoursePlan selectedCourses={selectedCourses} />
      </Modal>

      {editingCourse ? (
        <CourseForm course={editingCourse} onCancel={stopEditing} />
      ) : (
        <CourseList
          courses={data.courses}
          selectedTerm={selectedTerm}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          startEditing={startEditing}
        />
      )}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
