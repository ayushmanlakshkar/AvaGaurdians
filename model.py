import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

def train_model():
    # Load the dataset from the CSV file
    Av_df = pd.read_csv('model_dataset.csv', delimiter=',')

    # Fill missing values in each column with the mean of that column
    for i in Av_df.columns:
        Av_df[i].fillna(int(Av_df[i].mean()), inplace=True)

    # Extract features (X) and target variable (y) from the dataset
    X = Av_df[['elevation', 'temperature', 'wind_speed', 'humidity']]
    y = Av_df['danger_level'].div(5).mul(100).astype(int)

    # Split the dataset into training and testing sets
    train_x, _, train_y, _ = train_test_split(X, y, test_size=0.1)

    # Create a Random Forest Classifier model with 200 trees
    model = RandomForestClassifier(n_estimators=200)

    # Train the model on the training data
    model.fit(train_x, np.ravel(train_y, order='C'))

    # Return the trained model
    return model
