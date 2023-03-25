import keras
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
import PIL
import numpy as np
import urllib
app = Flask(__name__)
CORS(app)

categories = ['Flat', 'High', 'Normal']

tmp_url = "https://res.cloudinary.com/team-40/image/upload/v1679747046/mlvjskd1l7uwwn3x3enj.png"

# Load Keras Model from path provided
def load_model(modelpath):
    model = keras.models.load_model(modelpath)
    return model

# Predict the class of image, when provided with imagepath and model
def predict(imgpath, model):
    filename = imgpath.split('/')[-1]
    urllib.request.urlretrieve(imgpath, filename)

    img = keras.utils.load_img(
        filename, target_size=(256, 256)
    )
    img_array = keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch
    predictions = model.predict(img_array)
    # score = np.array(tf.nn.softmax(predictions[0]))
    print(predictions)
    max_val = max(predictions[0])
    if(max_val == predictions[0][0]):
        return categories[0]
    elif max_val == prediction[0][1]:
        return categories[1]
    return categories[2]

@app.route("/predict-arch", methods=["POST"])
def predict_arch():
    data = request.get_json(force=True)
    # print(data)
    # print(data["image"])
    image = data["image"]
    # image = tmp_url
    model = load_model('models/model50_1')
    prediction = predict(image, model)
    print(prediction)
    result = {}
    result = {"prediction": prediction}
    return jsonify(result)

if __name__ == '__main__':
    # predict_arch()
    app.run(host='0.0.0.0', port=8000)
