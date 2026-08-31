import os
import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array

# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "model",
    "class_names.json"
)

# ============================================================
# SETTINGS
# ============================================================

IMG_SIZE = (128, 128)

# ============================================================
# CHECK IMAGE ARGUMENT
# ============================================================

if len(sys.argv) < 2:

    print(json.dumps({
        "success": False,
        "error": "Image path is required"
    }))

    sys.exit(1)

image_path = sys.argv[1]

# ============================================================
# CHECK IMAGE FILE
# ============================================================

if not os.path.isfile(image_path):

    print(json.dumps({
        "success": False,
        "error": "Image file not found",
        "path": image_path
    }))

    sys.exit(1)

# ============================================================
# LOAD MODEL
# ============================================================

try:

    model = load_model(
        MODEL_PATH
    )

except Exception as e:

    print(json.dumps({
        "success": False,
        "error": "Could not load model",
        "details": str(e)
    }))

    sys.exit(1)

# ============================================================
# LOAD CLASS NAMES
# ============================================================

try:

    with open(
        CLASS_NAMES_PATH,
        "r"
    ) as f:

        class_names = json.load(f)

except Exception as e:

    print(json.dumps({
        "success": False,
        "error": "Could not load class names",
        "details": str(e)
    }))

    sys.exit(1)

# ============================================================
# LOAD IMAGE
# ============================================================

try:

    image = load_img(
        image_path,
        target_size=IMG_SIZE
    )

    image_array = img_to_array(
        image
    )

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    # MobileNetV2 preprocessing
    image_array = (
        tf.keras.applications.mobilenet_v2
        .preprocess_input(image_array)
    )

except Exception as e:

    print(json.dumps({
        "success": False,
        "error": "Could not process image",
        "details": str(e)
    }))

    sys.exit(1)

# ============================================================
# PREDICTION
# ============================================================

try:

    predictions = model.predict(
        image_array,
        verbose=0
    )

    predicted_index = int(
        np.argmax(predictions[0])
    )

    confidence = float(
        predictions[0][predicted_index]
    ) * 100

    predicted_class = class_names[
        predicted_index
    ]

except Exception as e:

    print(json.dumps({
        "success": False,
        "error": "Prediction failed",
        "details": str(e)
    }))

    sys.exit(1)

# ============================================================
# JSON RESULT
# ============================================================

result = {

    "success": True,

    "disease": predicted_class,

    "confidence": round(
        confidence,
        2
    )

}

print(
    json.dumps(result)
)
