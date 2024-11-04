# AtlasHub App

A simple web application to browse and search for countries, view details, filter by region and language, and add countries to a favorites list. This app is built using vanilla JavaScript, HTML, and CSS, and does not rely on any frameworks.

## Screensots

![Screenshot 2024-11-04 162455](https://github.com/user-attachments/assets/8885d722-35ca-4d5d-817f-8c26c718ba08)
![Screenshot 2024-11-04 162508](https://github.com/user-attachments/assets/da5af0af-1173-4b59-ad8d-0d3f318d6e4e)

## Features

- **Search**: Find countries by name.
- **Filter**: Filter countries by region and language.
- **View Details**: Click on a country to view more information.
- **Favorites**: Add countries to a favorites list (limit of 5 countries).
- **Responsive Design**: Fully responsive layout that adjusts to different screen sizes.

## Getting Started

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KALYAN1045/AtlasHub
   ```

2. **Navigate to the Project Folder**
   ```bash
   cd AtlasHub
   ```

3. **Run the Application**
   ```bash
   npm start

   ```

## Usage

- **Search**: Type in the search box to find countries by name.
- **Filter by Region**: Use the dropdown menu to filter countries by region.
- **Filter by Language**: Use the dropdown menu to filter countries by spoken language.
- **View Details**: Click on a country card to view more information, such as capital, region, and population.
- **Favorites**: Click the favorite button on a country card to add it to your favorites list. Access your favorites at any time.

## Functionality

- **Data Fetching**: Retrieves country data from the [REST Countries API](https://restcountries.com/v3.1/all).
- **Local Storage**: Saves the favorites list to `localStorage`, allowing it to persist between sessions.


- Data is provided by the [REST Countries API](https://restcountries.com).
- Inspiration from other country data applications.
