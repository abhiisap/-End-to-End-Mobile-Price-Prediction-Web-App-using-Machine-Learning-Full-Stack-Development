import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Import CSS for styling

function App() {
  const [formData, setFormData] = useState({
    battery_power: '',
    blue: '',
    clock_speed: '',
    dual_sim: '',
    fc: '',
    four_g: '',
    int_memory: '',
    m_dep: '',
    mobile_wt: '',
    n_cores: '',
    pc: '',
    ram: '',
    talk_time: '',
    three_g: '',
    touch_screen: '',
    wifi: '',
    sc_size: '',
    pixels: ''
  });

  const [price, setPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrice(res.data.predicted_price);
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>📱 Mobile Price Range Predictor</h2>
        <form onSubmit={handleSubmit} className="form-container">
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-group">
              <input
                className="form-input"
                name={key}
                placeholder={key.replace(/_/g, ' ').toUpperCase()}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">Predict</button>
        </form>
        {price !== null && <div className="result">Predicted Price Range: {price}</div>}
      </div>
    </div>
  );
}

export default App;
