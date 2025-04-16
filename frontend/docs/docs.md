# **App Name**: FinTrack Lite

## Core Features:

- User Authentication: User registration and login with phone number or email and password. The application will locally persist the session information. Phone numbers and emails must be validated for proper format.
- Dashboard: Dashboard displaying current balance with navigation buttons for deposit, transfer, and withdraw actions.
- Deposit Simulation: Deposit page allowing users to enter the deposit amount and trigger a mock charge transaction. The application will simulate a deposit and update the local balance.
- Transfer Simulation: Transfer page where users input the recipient's phone number or email and the transfer amount. The application will validate the user and will simulate the transfer by adjusting the balances. It will display a success or failure message depending on funds and user existence.
- Withdrawal Simulation: Withdrawal page allowing users to enter the withdrawal amount and bank account number. The app will validate sufficient balance and simulate the withdrawal, displaying the success or error message.

## Style Guidelines:

- Primary color: Green (#4CAF50) for a sense of financial well-being.
- Secondary color: Light gray (#F0F0F0) for backgrounds and neutral elements.
- Accent: Blue (#2196F3) for interactive elements and calls to action.
- Clean and readable typography is key. Use a sans-serif font for a modern look. Ensure good contrast for readability.
- Use simple, consistent icons for navigation and actions. Use green for deposit, red for withdrawal, and blue for transfer actions.
- Clean and intuitive layout with clear hierarchy. Use a floating action button (FAB) for quick access to main actions.
- Subtle transitions and animations for a smooth user experience. Use animations to indicate successful transactions or errors.

## Original User Request:
generate a financial app that will allow for an user to:

1. register using it's phone number, full name, email and a password.
2. login using phone number or email and password.
3. Enter a dashboard page in which the balance of the user will appear and a fab button will allow the user to navigate to one of the following routes: Deposit, Transfer, Withdraw.
4. Navigate to the deposit page, in which the user will tell the amount of tokens that will charge to its account and then after pressing a button they will be charged.
5. navigate to the transfer page, in which the user will tell how many tokens does it want to transfer to another user using it's phone number or email, then after approving the form with a button the specified amount will be deducted from the balance of the user making the transfer and will be sent to the user recieving the balance, in case that the transfer fails because of missing funds or because the user does not exist the app will show that error.
6. navigate to the withdraw page in which the user will be allowed to type the amount for the withdrawal and the bank account number that represents the destination account for that withdrawal, if there is not enough balance to complete the withdrawal the app should alert of the error.

Use react vite to achieve this
  