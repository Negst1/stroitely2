import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateService.css";

const CreateService = ({ saveService, editingService, setEditingService }) => {
    const [name, setName] = useState("");
    const [paymentType, setPaymentType] = useState("agreement");
    const [price, setPrice] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    useEffect(() => {
      if (editingService) {
        setName(editingService.name);
        setPaymentType(editingService.paymentType || "agreement");
        setPrice(editingService.price || "");
        setIsActive(editingService.isActive);
      }
    }, [editingService]);
  
    const validateForm = () => {
      const newErrors = {};
      if (!name) newErrors.name = "Наименование услуги обязательно";
      if ((paymentType === "hourly" || paymentType === "volume") && !price) {
        newErrors.price = "Укажите сумму оплаты";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSave = () => {
      if (!validateForm()) return;
  
      const newService = {
        id: editingService?.id || null,
        name,
        paymentType,
        price: paymentType === "agreement" ? null : price,
        isActive,
      };
  
      saveService(newService);
      setEditingService(null);
      navigate("/services");
    };
  
    const handleCancel = () => {
      setEditingService(null);
      navigate("/services");
    };

  return (
    <section className="createServices-section">
      <div className="createServices-content">
        <div className="createServices-title">
          {editingService ? "Редактирование услуги" : "Создание услуги"}
        </div>

        {/* Поле наименования */}
        <div className="nameService-content">
          <label className="nameService-label">
            Наименование услуги*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`nameService-input ${errors.name ? "error" : ""}`}
              placeholder="Введите наименование услуги"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </label>
        </div>

        {/* Тип и сумма оплаты */}
        <div className="typeAndSumm-content">
          <label className="typeAndSumm-title">Тип и сумма оплаты*</label>
          <div className="typeAndSumm-labels">
            <label className="typeAndSumm-label">
              <input
                type="radio"
                checked={paymentType === "agreement"}
                onChange={() => {
                  setPaymentType("agreement");
                  setPrice("");
                }}
              />
              По договоренности
            </label>
            <label className="typeAndSumm-label">
              <input
                type="radio"
                checked={paymentType === "hourly"}
                onChange={() => setPaymentType("hourly")}
              />
              Почасовая оплата
              {paymentType === "hourly" && (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`typeAndSumm-input ${errors.price ? "error" : ""}`}
                  placeholder="Сумма ($/час)"
                />
              )}
            </label>
            <label className="typeAndSumm-label">
              <input
                type="radio"
                checked={paymentType === "volume"}
                onChange={() => setPaymentType("volume")}
              />
              Оплата по объему работ
              {paymentType === "volume" && (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`typeAndSumm-input ${errors.price ? "error" : ""}`}
                  placeholder="Сумма ($)"
                />
              )}
            </label>
          </div>
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        {/* Переключатель активности */}
        <div className="beActive-content">
          <label className="beActive-title">
            Активность
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </label>
        </div>

        {/* Кнопки */}
        <div className="createService-btns">
          <button
            className="createService-btn cancel"
            onClick={handleCancel}
          >
            Отмена
          </button>
          <button className="createService-btn save" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateService;
