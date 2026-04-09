# Project Blueprint: Animal Face Test

## Overview

This project is a web application that uses a pre-trained machine learning model from Teachable Machine to analyze a user's face via webcam and determine if they have features more similar to a cat or a dog.

## Implemented Features

*   **Real-time Webcam Analysis:** The application uses the user's webcam to capture video for real-time analysis.
*   **Machine Learning Model:** It integrates a custom image classification model built with Teachable Machine (`https://teachablemachine.withgoogle.com/models/J78gMY2UR/`).
*   **Dynamic Predictions:** It displays the live probability scores for the "Cat" and "Dog" classifications.
*   **User Interface:**
    *   A "Start" button to initialize the webcam and model.
    *   A container to display the webcam feed.
    *   A section to show the classification results.
*   **Styling & Theme:**
    *   A clean, centered layout.
    *   A dark/light mode theme switcher for user preference.
    *   Modern and responsive design.

## Current Plan

*   **Task:** Replace the existing "Lotto Number Generator" with the new "Animal Face Test" application.
    1.  **[Done]** Create a `blueprint.md` file outlining the new project.
    2.  **[Next]** Update `index.html` to remove the lotto generator components and add the structure for the webcam, start button, and label container.
    3.  Update `style.css` to style the new elements and remove obsolete styles.
    4.  Replace the JavaScript in `main.js` with the provided Teachable Machine code to handle model loading and prediction.
