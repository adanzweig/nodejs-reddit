# Reddit OAuth Express Application

This Express application demonstrates how to authenticate with Reddit using OAuth, list threads, and create posts programmatically. It includes routes for authenticating with Reddit, saving the OAuth token, listing hot threads, and posting to a subreddit.

## Prerequisites

- Node.js and npm installed
- A Reddit account
- A Reddit application with client ID and client secret

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/adanzweig/nodejs-reddit.git
   cd nodejs-reddit
   ```

2. **Install dependencies**

   Navigate to your project directory and run:

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory of your project and add the following variables:

   ```plaintext
   CLIENT_ID=your_client_id_here
   CLIENT_SECRET=your_client_secret_here
   REDIRECT_URI=http://localhost:3000/reddit/callback
   USER_AGENT=your_user_agent_here
   ```

   Replace `your_client_id_here`, `your_client_secret_here`, and `your_user_agent_here` with your actual Reddit application credentials and user agent.

## Usage

1. **Start the server**

   Run the following command to start the Express server:

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000`.

2. **Authenticate with Reddit**

   Open a browser and navigate to `http://localhost:3000/auth/reddit` to start the authentication process.

3. **List Hot Threads**

   After authentication, you can list the hot threads by navigating to `http://localhost:3000/list`.

4. **Create a Post**

   To create a new post in the r/developer subreddit, navigate to `http://localhost:3000/create-post`. This is configured to post a predefined message. Modify the route as needed to post dynamic content.

## Environment Variables

This application requires several environment variables to run properly:

- `CLIENT_ID`: Your Reddit application's client ID.
- `CLIENT_SECRET`: Your Reddit application's client secret.
- `REDIRECT_URI`: The redirect URI set in your Reddit application (must match exactly).
- `USER_AGENT`: A user agent string for your application.

Ensure these values are correctly set in your `.env` file before starting the application.

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.