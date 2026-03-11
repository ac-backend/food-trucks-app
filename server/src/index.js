// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// importing our Node modules
import express from "express"; // the framework that lets us build a web server
import pg from "pg" // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js" // import our database connection string

// connect to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true", // credentials to access the database. Keep private! 
  ssl: true // use SSL encryption when connecting to the database
})

const app = express(); // Create an instance of the express module

app.use(express.json()); // This server will receive and respond in JSON format

const port = 3000; // Set which port to listen to to receive requests

// Define our port, then turn on our server to listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllFoodTrucks()
const getAllFoodTrucks = async () => {
  const result = await db.query("SELECT * FROM food_trucks;");
  return result.rows;
};

// 2. getFoodTruckById(id)
const getFoodTruckById = async (id) => {
  const result = await db.query("SELECT * FROM food_trucks WHERE id = $1", [id]);
  return result.rows[0];
};

// 3. getVeganFoodTrucks()
const getVeganFoodTrucks = async () => {
  const result = await db.query("SELECT * FROM food_trucks WHERE has_vegan_options = true;");
  return result.rows;
};

// 4. addOneFoodTruck(name, current_location, daily_special, slogan, has_vegan_options)
const addOneFoodTruck = async (name, current_location, daily_special, slogan, has_vegan_options) => {
  const result = await db.query(
    "INSERT INTO food_trucks (name, current_location, daily_special, slogan, has_vegan_options) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, current_location, daily_special, slogan, has_vegan_options]
  );
  return result.rows[0];
};

// 5. deleteOneFoodTruck(id)
const deleteOneFoodTruck = async (id) => {
  const result = await db.query("DELETE FROM food_trucks WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  const foodTrucks = await getAllFoodTrucks();
  res.json(foodTrucks);
});

// 2. GET /get-food-truck-by-id/:id
app.get("/get-food-truck-by-id/:id", async (req, res) => {
  const id = req.params.id;
  const foodTruck = await getFoodTruckById(id);
  res.json(foodTruck);
});

// 3. GET /get-vegan-food-trucks
app.get("/get-vegan-food-trucks", async (req, res) => {
  const foodTrucks = await getVeganFoodTrucks();
  res.json(foodTrucks);
});

// 4. POST /add-one-food-truck
app.post("/add-one-food-truck", async (req, res) => {
  const { name, current_location, daily_special, slogan, has_vegan_options } = req.body;
  const foodTruck = await addOneFoodTruck(name, current_location, daily_special, slogan, has_vegan_options);
  res.json(foodTruck);
});

// 5. POST /delete-one-food-truck/:id
app.post("/delete-one-food-truck/:id", async (req, res) => {
  const id = req.params.id;
  const foodTruck = await deleteOneFoodTruck(id);
  res.json(foodTruck);
});