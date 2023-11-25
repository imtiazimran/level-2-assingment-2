# Node.js Express CRUD Application with MongoDB (Mongoose) and TypeScript

This is a Node.js Express application that manages user data and orders, utilizing MongoDB with Mongoose for data storage. The program is built using TypeScript to enhance type safety and provides various functionalities for user and order management.



## Running the Program Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/imtiazimran/level-2-assingment-2.git
   ```

2. Install dependencies:

   ```bash
   cd project-folder
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. The server runs at [http://localhost:5000/](http://localhost:5000/)

5. Use a tool like Postman or a web browser to test the API endpoints.




## User Management Functions:

1. **Create a New User**
   - Function: `createNewUser`
   - API Endpoint: `POST /api/users`

2. **Retrieve a List of All Users**
   - Function: `getAllUsers`
   - API Endpoint: `GET /api/users`

3. **Retrieve a Specific User by ID**
   - Function: `getUserByID`
   - API Endpoint: `GET /api/users/:userId`

4. **Update User Information**
   - Function: `updateUserInfo`
   - API Endpoint: `PUT /api/users/:userId`

5. **Delete a User**
   - Function: `deleteUser`
   - API Endpoint: `DELETE /api/users/:userId`

## Order Management Functions:

1. **Add New Product in Order**
   - Function: `addProductToOrder`
   - API Endpoint: `PUT /api/users/:userId/orders`

2. **Retrieve all orders for a specific user**
   - Function: `getAllOrdersForUser`
   - API Endpoint: `GET /api/users/:userId/orders`

3. **Calculate Total Price of Orders for a Specific User**
   - Function: `calculateTotalPriceForUserOrders`
   - API Endpoint: `GET /api/users/:userId/orders/total-price`

