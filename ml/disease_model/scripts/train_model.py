import os
import json
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2

# ==========================================
# PATHS
# ==========================================
DATA_DIR = "/home/elcot/DataDrive/smart-farming-assistant/ml/disease_model/plantvillage/raw/color"
MODEL_DIR = "/home/elcot/DataDrive/smart-farming-assistant/ml/disease_model/model"

os.makedirs(MODEL_DIR, exist_ok=True)

# ==========================================
# SETTINGS - CPU FRIENDLY
# ==========================================
IMG_SIZE = (128, 128)
BATCH_SIZE = 8
EPOCHS = 5
SEED = 123

print("Loading PlantVillage dataset...")

# ==========================================
# LOAD DATA
# ==========================================
train_ds = keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.2,
    subset="training",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

val_ds = keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_ds.class_names
num_classes = len(class_names)

print("Number of classes:", num_classes)

# Save class names
with open(
    os.path.join(MODEL_DIR, "class_names.json"),
    "w"
) as f:
    json.dump(class_names, f, indent=2)

# ==========================================
# DATA PERFORMANCE
# ==========================================
AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)

# ==========================================
# DATA AUGMENTATION
# ==========================================
data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.05),
    layers.RandomZoom(0.05)
])

# ==========================================
# MOBILE NET V2
# ==========================================
base_model = MobileNetV2(
    input_shape=IMG_SIZE + (3,),
    include_top=False,
    weights="imagenet"
)

# Freeze MobileNetV2
base_model.trainable = False

# ==========================================
# MODEL
# ==========================================
inputs = keras.Input(
    shape=IMG_SIZE + (3,)
)

x = data_augmentation(inputs)

x = keras.applications.mobilenet_v2.preprocess_input(x)

x = base_model(
    x,
    training=False
)

x = layers.GlobalAveragePooling2D()(x)

x = layers.Dropout(0.2)(x)

outputs = layers.Dense(
    num_classes,
    activation="softmax"
)(x)

model = keras.Model(
    inputs,
    outputs
)

# ==========================================
# COMPILE
# ==========================================
model.compile(
    optimizer=keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# ==========================================
# CHECKPOINT
# ==========================================
checkpoint_path = os.path.join(
    MODEL_DIR,
    "best_model.keras"
)

checkpoint = keras.callbacks.ModelCheckpoint(
    checkpoint_path,
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)

# ==========================================
# EARLY STOPPING
# ==========================================
early_stop = keras.callbacks.EarlyStopping(
    monitor="val_accuracy",
    patience=2,
    restore_best_weights=True
)

# ==========================================
# TRAIN
# ==========================================
print()
print("====================================")
print("STARTING TRAINING")
print("Classes:", num_classes)
print("Image size:", IMG_SIZE)
print("Batch size:", BATCH_SIZE)
print("Epochs:", EPOCHS)
print("====================================")
print()

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=[
        checkpoint,
        early_stop
    ]
)

# ==========================================
# SAVE FINAL MODEL
# ==========================================
final_model_path = os.path.join(
    MODEL_DIR,
    "crop_disease_model.keras"
)

model.save(final_model_path)

print()
print("====================================")
print("TRAINING COMPLETE!")
print("Model saved:")
print(final_model_path)
print("====================================")
