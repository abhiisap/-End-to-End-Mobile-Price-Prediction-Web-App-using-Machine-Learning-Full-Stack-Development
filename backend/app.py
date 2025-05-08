from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Ensure the order of features matches training
        features = np.array([[float(data[key]) for key in [
            'battery_power', 'blue', 'clock_speed', 'dual_sim', 'fc', 'four_g',
            'int_memory', 'm_dep', 'mobile_wt', 'n_cores', 'pc', 'ram',
            'talk_time', 'three_g', 'touch_screen', 'wifi', 'sc_size', 'pixels'
        ]]])

        prediction = model.predict(features)
        return jsonify({'predicted_price': int(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
