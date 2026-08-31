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
# CPU-FRIENDLY SETTINGS
# ==========================================
IMG_SIZE = (128, 128)
BATCH_SIZE = 8
EPOCHS = 3
IMAGES_PER_CLASS = 100
SEED = 123

# Limit TensorFlow CPU threads
tf.config.threading.set_intra_op_parallelism_threads(2)
tf.config.threading.set_inter_op_parallelism_threads(2)

print("======================================")
print("Smart Farming - Disease Detection")
print("CPU-friendly training")
print("======================================")

# ==========================================
# FIND CLASSES
# ==========================================
class_names = sorted([
    d for d in os.listdir(DATA_DIR)
    if os.path.isdir(os.path.join(DATA_DIR, d))
])

num_classes = len(class_names)

print("Classes:", num_classes)

if num_classes != 38:
    raise RuntimeError(
        f"Expected 38 classes, found {num_classes}"
    )

# Save class names
with open(
    os.path.join(MODEL_DIR, "class_names.json"),
    "w"
) as f:
    json.dump(class_names, f, indent=2)

# ==========================================
# CREATE SMALL DATASET
# ==========================================
image_paths = []
labels = []

extensions = (".jpg", ".jpeg", ".png")

for label, class_name in enumerate(class_names):

    class_dir = os.path.join(DATA_DIR, class_name)

    files = [
        os.path.join(class_dir, f)
        for f in os.listdir(class_dir)
        if f.lower().endswith(extensions)
    ]

    files.sort()

    # Take only a small number from each class
    files = files[:IMAGES_PER_CLASS]

    print(
        f"{label:2d}: {class_name} -> {len(files)} images"
    )

    for path in files:
        image_paths.append(path)
        labels.append(label)

print()
print("Total images:", len(image_paths))

# ==========================================
# SHUFFLE DATA
# ==========================================
import random

combined = list(zip(image_paths, labels))

random.seed(SEED)
random.shuffle(combined)

image_paths, labels = zip(*combined)

image_paths = list(image_paths)
labels = list(labels)

# ==========================================
# TRAIN / VALIDATION SPLIT
# ==========================================
split = int(len(image_paths) * 0.8)

train_paths = image_paths[:split]
train_labels = labels[:split]

val_paths = image_paths[split:]
val_labels = labels[split:]

print("Training images:", len(train_paths))
print("Validation images:", len(val_paths))

# ==========================================
# IMAGE LOADER
# ==========================================
def load_image(path, label):

    image = tf.io.read_file(path)

    image = tf.image.decode_image(
        image,
        channels=3,
        expand_animations=False
    )

    image = tf.image.resize(
        image,
        IMG_SIZE
    )

    image = tf.cast(
        image,
        tf.float32
    )

    return image, label


# ==========================================
# DATASETS
# ==========================================
train_ds = tf.data.Dataset.from_tensor_slices(
    (train_paths, train_labels)
)

train_ds = train_ds.map(
    load_image,
    num_parallel_calls=1
)

train_ds = train_ds.batch(BATCH_SIZE)
train_ds = train_ds.prefetch(1)


val_ds = tf.data.Dataset.from_tensor_slices(
    (val_paths, val_labels)
)

val_ds = val_ds.map(
    load_image,
    num_parallel_calls=1
)

val_ds = val_ds.batch(BATCH_SIZE)
val_ds = val_ds.prefetch(1)

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

base_model.trainable = False

# ==========================================
# BUILD MODEL
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
# TRAIN
# ==========================================
print()
print("======================================")
print("STARTING TRAINING")
print("======================================")

model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=[checkpoint]
)

# ==========================================
# SAVE FINAL MODEL
# ==========================================
final_path = os.path.join(
    MODEL_DIR,
    "crop_disease_model.keras"
)

model.save(final_path)

print()
print("======================================")
print("TRAINING COMPLETE!")
print("======================================")
print("Saved:", final_path)
