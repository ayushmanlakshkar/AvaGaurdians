from flask import Flask, request, jsonify
from model import train_model
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = train_model()

@app.route('/', methods=['GET'])
def working():
    return jsonify({"message": "working"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Extract features from the request data
        features = [data.get('elevation', 0), data.get('temperature', 0),
                    data.get('wind_speed', 0), data.get('humidity', 0)]

        # Convert features to NumPy array
        features = np.array(features).reshape(1, -1)

        # Make a prediction using the pre-trained model
        prediction = model.predict(features)[0]

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
