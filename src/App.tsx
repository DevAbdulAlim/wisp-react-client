import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import MessagesPage from "./pages/MessagesPage";
import HomePage from "./pages/homePage";
import CreateRoom from "./pages/CreateRoom";
import GroupMessage from "./pages/GroupMessage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="chats/:chatId" element={<MessagesPage />} />
          <Route path="profile" element={<div>Profile Page</div>} />
          <Route path="contacts" element={<div>Contacts Page</div>} />
          <Route path="new-group" element={<CreateRoom />} />
          <Route path="groups/:room" element={<GroupMessage />} />
          <Route
            path="saved-messages"
            element={<div>Saved Messages Page</div>}
          />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="logout" element={<div>Logout Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
