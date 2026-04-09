const URL = "https://teachablemachine.withgoogle.com/models/J78gMY2UR/";

let model, labelContainer, maxPredictions;

const uploadButton = document.getElementById('upload-button');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');

async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

// run the webcam image through the image model
async function predict(image) {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(image);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

uploadButton.addEventListener('click', () => imageUpload.click());

imageUpload.addEventListener('change', async (event) => {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            if (!model) {
                await loadModel();
            }
            await predict(imagePreview);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});


const themeToggle = document.getElementById('checkbox');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
});
