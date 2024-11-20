import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditService.css";

const EditService = ({ saveService, editingService, setEditingService }) => {
  const [name, setName] = useState("");
  const [paymentType, setPaymentType] = useState("agreement");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем ID из маршрута

  useEffect(() => {
    if (editingService) {
      setName(editingService.name || "");
      setPaymentType(editingService.paymentType || "agreement");
      setPrice(editingService.price || "");
      setIsActive(editingService.isActive || false);
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

    const updatedService = {
      id: editingService?.id || null,
      name,
      paymentType,
      price: paymentType === "agreement" ? null : price,
      isActive,
    };

    saveService(updatedService); // Сохраняем изменения
    setEditingService(null);
    navigate("/services");
  };

  const handleCancel = () => {
    setEditingService(null);
    navigate("/services");
  };

  return (
    <section className="editService-section">
      <div className="editService-content">
        <div className="editService-title">Редактирование услуги</div>

        {/* Поля ввода */}
        <div className="nameService-content">
          <label>
            Наименование услуги*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "error" : ""}
              placeholder="Введите наименование услуги"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </label>
        </div>

        {/* Тип оплаты */}
        <div className="typeAndSumm-content">
          <label>Тип и сумма оплаты*</label>
          <div>
            <label>
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
            <label>
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
                  placeholder="Сумма ($/час)"
                />
              )}
            </label>
            <label>
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
                  placeholder="Сумма ($)"
                />
              )}
            </label>
          </div>
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        {/* Переключатель активности */}
        <div>
          <label>
            Активность
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </label>
        </div>

        {/* Кнопки */}
        <div>
          <button onClick={handleCancel}>Отмена</button>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </section>
  );
};

export default EditService;
