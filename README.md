# User Search & Details App (Interview Project)

Hi! This is a simple Angular app I built for an interview project. It lets you search for users, view them in a table, and see details for each user. Here's how it works and how to run it:

## What you can do
- **Search for users**
  - Type at least 3 characters to search by name, email, etc.
  - Or, switch to "ID/Email" mode to search for a specific user.
- **See results in a table**
  - The table shows all matching users.
  - You can sort by age (default is youngest to oldest), and click the column to change the order.
  - Click any row to see more details about that user.
- **View user details**
  - See all info for a user on a separate page.
  - Click the back arrow to return to your search results.
- **Navigation**
  - The back arrow below the table takes you home and clears your previous search.

## How it works
- The app remembers your last search results while you browse details.
- If you start a new search or go home, it clears the old results.
- Error messages pop up if you search with too few characters or if there's a problem.

## Tech used
- Angular 18 (standalone components)
- AG-Grid for the table
- SCSS for styles
- RxJS for async stuff

## How to run it
1. Clone this repo
2. Run `npm install` in the `recipe-ui` folder
3. Start the app with `ng serve`
4. Open [http://localhost:4200](http://localhost:4200) in your browser

**Note:**
- The app expects a backend running at `http://localhost:8080`. If yours is different, update the URL in `src/environments/environment.ts`.

