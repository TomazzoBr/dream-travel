# Travel App - Next.js

This is a travel app built with Next.js, where you can manage trips, search for them, and apply filters to view upcoming or completed trips. The app also supports saving and deleting trips.

Features
Search Trips: Filter trips by title, description, or introduction.
Filter Trips: View all trips, upcoming trips, or completed trips.
Save and Edit Trips: Add new trips or update existing ones.
Delete Trips: Remove trips from your list.
Local Storage: Stores trips locally in the browser to persist data between sessions.

Getting Started
1. Clone the repository
bash
Copy code
git clone https://github.com/TomazzoBr/dream-travel
cd dream-travel
2. Install dependencies
Use npm to install the required dependencies.

bash
Copy code
npm install

3. Start the development server
Run the app in development mode:

bash
Copy code
npm run dev

This will start the app on http://localhost:3000.

4. Visit the app
Open your browser and go to http://localhost:3000 to see the app in action.

Folder Structure
pages/: Contains the routes for the app (currently no pages/ directory as the app uses the App Router).
components/: Contains React components like Header, Search, Filters, TravelItemsList, etc.
lib/: Types.
public/: Static files like images, icons, etc.

Dependencies
1. Next.js: The React framework used for building the app.
2. Tailwind CSS: For styling the app.
3. uuid: For generating unique IDs for trips.
4. localStorage: Used for storing trips in the browser’s local storage.
