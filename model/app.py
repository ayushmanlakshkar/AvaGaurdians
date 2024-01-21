from flask import Flask, request, jsonify
from model import train_model
import numpy as np
import json

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
        print(data)
        # Extract features from the request data
        features = [data['elevation'], data['temperature'],
                    data['wind_speed'], data['humidity']]
        print(features)
        # Convert features to NumPy array
        features = np.array(features).reshape(1, -1)

        # Make a prediction using the pre-trained model
        prediction = model.predict(features)[0]
        print(prediction)
        response = json.dumps({'prediction': str(prediction)})
        return jsonify(json.loads(response))
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)


