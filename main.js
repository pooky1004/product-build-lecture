const URL = "https://teachablemachine.withgoogle.com/models/J78gMY2UR/";

let model, labelContainer, maxPredictions;

const uploadButton = document.getElementById('upload-button');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const loader = document.getElementById('loader');

async function init() {
    loader.style.display = 'block';
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");

        uploadButton.disabled = false;
        uploadButton.textContent = 'Upload Image';
    } catch (error) {
        console.error("Error loading model:", error);
        uploadButton.textContent = 'Error loading model';
    } finally {
        loader.style.display = 'none';
    }
}

async function predict(image) {
    const prediction = await model.predict(image);
    // Clear previous results
    labelContainer.innerHTML = "";

    for (let i = 0; i < maxPredictions; i++) {
        const resultContainer = document.createElement("div");
        resultContainer.classList.add("prediction-result");

        const className = prediction[i].className;
        const probability = prediction[i].probability;

        resultContainer.innerHTML = `
            <span class="class-name">${className}</span>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${probability * 100}%"></div>
            </div>
            <span class="probability">${(probability * 100).toFixed(1)}%</span>
        `;
        labelContainer.appendChild(resultContainer);
    }
}

uploadButton.addEventListener('click', () => imageUpload.click());

imageUpload.addEventListener('change', async (event) => {
    if (event.target.files && event.target.files[0]) {
        labelContainer.innerHTML = ""; // Clear old results immediately
        loader.style.display = 'block'; // Show loader while predicting
        const reader = new FileReader();
        reader.onload = async (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            await predict(imagePreview);
            loader.style.display = 'none'; // Hide loader after predicting
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

init();
