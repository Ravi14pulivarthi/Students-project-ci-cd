import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import StudentDetails from "./pages/StudentDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add" element={<AddStudent />} />
      <Route path="/edit/:id" element={<AddStudent />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/students/:id" element={<StudentDetails />} />
    </Routes>
  );
}

export default App;
