import React, { useState } from "react";
import "./ServicePreview.css";
import { useNavigate } from "react-router-dom";

const ServicePreview = ({ service, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleConfirmDelete = () => {
    onDelete(service.id);
    setIsModalOpen(false);
  };

  return (
    <div className="servicePreview-section">
      <div className="servicePreview-content">
        <div className="servicePreview-content__wrap">
          <div className="servicePreview-content__left">
            <div className="service-name">{service.name}</div>
            <div className="service-status">
              <div className="service-status__text">
                {service.isActive ? "Активно" : "Неактивно"}
              </div>
            </div>
          </div>
          <div className="service-price__wrap">
            <div className="service-price">
              {service.price || "По договоренности"}
            </div>
          </div>
        </div>
        <div className="service-btn__area">
          <button
            className="service-btn edit"
            onClick={() => {
              onEdit(service); // Передаем выбранную услугу для редактирования
              navigate(`/edit-service/${service.id}`); // Перенаправление на страницу редактирования
            }}
          ></button>
          <button
            className="service-btn delete"
            onClick={handleDeleteClick}
          ></button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <p>Вы уверены, что хотите удалить услугу?</p>
            <button className="modal-btn confirm" onClick={handleConfirmDelete}>
              Да
            </button>
            <button className="modal-btn cancel" onClick={handleCancel}>
              Нет
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ServicePreview;
