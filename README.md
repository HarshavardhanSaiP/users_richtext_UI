Description:
The frontend provides a user-friendly interface to view, search, and explore recipes fetched from the backend service.

Features:
Responsive user interface using Angular.
Search recipes by name, cuisine.
Displays recipe details, including ingredients and preparation instructions.
Handles smooth UI transitions and data loading.

Technologies Used:
Angular 18 with standalone components.
RxJS for handling asynchronous operations.
SCSS for styling.
AG-Grid for Tabular components

Setup:
1.Clone the Repository
2.Install Dependencies
    npm install
3.Run the Application
    ng serve

Key Components:
Search Bar: Allows searching recipes by text input.
Recipe List: Displays search results in a card format.
Recipe Details Page: Provides detailed information about a selected recipe.    

Notes:
Ensure the backend is running at http://localhost:8080 or adjust the API endpoint in src/environments/environment.ts.
