import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportIssue from "./pages/ReportIssue";
import IssuesList from "./pages/IssuesList";
import AdminDashboard from "./pages/AdminDashboard";
import Chatbot from "./components/chatbot";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/issues" element={<IssuesList />} />
        <Route path="/" element={<IssuesList />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Chatbot/>
    </Router>
  );
}

export default App;
