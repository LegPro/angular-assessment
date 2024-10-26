# Company Search Application

## Goal
This application allows users to search for companies by name or company number and view detailed information about a selected company. Implemented using Angular 7 or above.

## Features
- **Search Functionality**: Users can search for a company by either its name or company number.
- **Result Display**: Displays search results with the company name, number, and details.
- **Company Details and Officers View**: Users can click on a company from the search results to view its details and list of officers (after authentication).
- **Pagination**: Search results are paginated for easier navigation.
- **Authentication**: Restricted access to the details and officer pages (mock authentication is used: Username : admin, Password: admin).
- **Styling**: Styled with Bootstrap for a responsive, clean UI.
- **Input Validation**: The search input is validated to ensure that only valid names or numbers are entered.

## Technology Stack
- **Angular**: Version 18.
- **CSS**: Used for additional styling.
- **Bootstrap**: Used for responsive design and layout.
- **NPM Components**: Additional components from NPM are used where necessary.

## API Endpoints
### Search for a Company
- URL: `https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Search?Query={search_term}`
- Description: Retrieves a list of companies based on the search term.

### Get Company Officers
- URL: `https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber={number}`
- Description: Retrieves a list of officers for the specified company.


## Application Flow
1. **Search Page**: 
   - The user enters a company name or number and clicks "Search."
   - If the input is valid, a list of matching companies is displayed with pagination controls.
  
2. **Search Results Page**:
   - The user sees the list of companies based on their search criteria.
   - Clicking on a company name initiates an authentication check.
   
3. **Authentication**:
   - If the user is not authenticated, a login modal is displayed for authentication.
   - Once authenticated, the user can proceed to the company’s details page.

4. **Details Page**:
   - Shows detailed information about the selected company, including name, number, status, incorporation date, and address.
   - A link to view the list of officers is provided.

5. **Officer Page**:
   - Displays the list of officers for the selected company in a detailed format.

## Getting Started
### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) and [Angular CLI](https://angular.io/cli) installed.

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   ng serve
   ```

2. Open your browser and go to:
   ```
   http://localhost:4200
   ```

### Project Structure
- **Home Page (Search)**: Allows users to search for companies by name or number with validation.
- **Search Results**: Displays a list of results with pagination.
- **Details Page**: Shows detailed information about the selected company (restricted access).
- **Officer Page**: Lists the officers associated with the company (restricted access).

## Optional Enhancements
- **Styling**: Additional Bootstrap styling for form inputs and buttons.
- **Paging Controls**: Pagination for search results, styled with Bootstrap.
- **Mock Authentication**: Simple authentication is used to restrict access to sensitive pages (mock authentication is used: Username : admin, Password: admin).