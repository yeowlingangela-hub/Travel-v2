# Travel-v2 Project Blueprint

## Overview
This project is a framework-less web application (HTML, CSS, JavaScript) designed to showcase travel destinations and information. It aims for a modern, visually appealing, and responsive user experience.

## Current Features
- Basic HTML structure (index.html)
- Styling (style.css)
- JavaScript functionality (main.js)
- Integration with Firebase Studio development environment.
- Git repository for version control.
- "Recommended Hotels" section with placeholder data and images, including simulated attraction proximity.
- Itinerary generation with attraction and image placeholders for each day.

## Plan for Itinerary Improvements: No Empty Attractions & Hotel Links

### Objective
1.  Ensure every day in the generated travel itinerary has a specific recommended attraction, avoiding the "No new attractions available" message by cycling through attractions.
2.  Provide functional (even if placeholder) booking links for all recommended hotels.
The changes will be committed, pushed to the GitHub repository, and reflected on Cloudflare Pages.

### Assumptions
1.  **Dynamic Itinerary Generation**: The itinerary results are generated dynamically via `main.js` and displayed in the `<div id="itinerary-results"></div>` section of `index.html`.
2.  **Attraction Cycling**: The logic for selecting attractions will be modified to cycle through the available attractions for a destination, rather than running out.
3.  **Hotel Link Placeholders**: Hotel data in `mockData` will be updated to include a `bookingLink` property with placeholder URLs.
4.  **Implementation Style**: I will continue to adhere to modern web standards (HTML, CSS, JavaScript) as outlined in `GEMINI.md`.
5.  **Cloudflare Pages**: It is assumed that the GitHub repository is already connected to Cloudflare Pages for automatic deployments upon push.

### Steps
1.  **Update blueprint.md**: (Already doing this)
2.  **Modify `main.js` - Attractions**:
    *   Locate the itinerary generation loop.
    *   Change the attraction selection logic to use the modulo operator (`%`) with the total number of attractions, ensuring a continuous cycle through available attractions.
3.  **Modify `main.js` - Hotel Links**:
    *   Update the `mockData` structure to define hotels as objects with `name` and `bookingLink` properties.
    *   Adjust the `hotelsCard` generation to render `<a>` tags with `href` attributes derived from the `bookingLink` property for each hotel.
    *   Update the hotel list in `index.html` as well to use the new object structure if they are hardcoded there.
4.  **Review and Verify**: Test the itinerary generation to ensure attractions are always present and hotel links are rendered correctly.
5.  **Commit and Push**: Commit the changes to the Git repository with a clear commit message and push to the `main` branch.