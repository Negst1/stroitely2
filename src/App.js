import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Services from "./components/services/Services";
import CreateService from "./components/create-service/CreateService";
import EditService from "./components/edit-service/EditService";
import "./App.css";

function App() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  // Добавление или обновление услуги
  const saveService = (service) => {
    if (service.id) {
      // Обновление существующей услуги
      setServices((prevServices) =>
        prevServices.map((s) => (s.id === service.id ? service : s))
      );
    } else {
      // Добавление новой услуги
      setServices((prevServices) => [
        ...prevServices,
        { ...service, id: Date.now() },
      ]);
    }
  };

  // Удаление услуги
  const deleteService = (id) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  return (
    <div className="App">
      <div className="sidebar-wrap">
        <Sidebar />
      </div>
      <div className="content">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route
              path="services"
              element={
                <Services
                  services={services}
                  deleteService={deleteService}
                  setEditingService={setEditingService}
                />
              }
            />
            <Route
              path="create-services"
              element={
                <CreateService
                  saveService={saveService}
                  editingService={editingService}
                  setEditingService={setEditingService}
                />
              }
            />
            <Route
                path="edit-service/:id"
                element={
                  <EditService
                    saveService={saveService}
                    editingService={editingService}
                    setEditingService={setEditingService}
                  />
                }
              />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
