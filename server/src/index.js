// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllFoodTrucks()
async function getAllFoodTrucks() {
  // counts total number of rows in food-trucks table
  const result = await db.query("SELECT * FROM food_trucks;");
  return result.rows;
}

// 2. getFoodTruckById(id)
// helper function that finds a food truck using its id
async function getFoodTruckById(id) {
  // query the database for the food truck with this id
  const result = await db.query("SELECT * FROM food_trucks WHERE id = $1", [
    id,
  ]);

  // returns the food truck that was found
  return result.rows[0];
}

// 3. getVeganFoodTrucks()

// 4. getFoodTrucksByPrice(price)

async function getFoodTruckByPrice(price) {
  const result = await db.query(
    "SELECT * FROM food_trucks WHERE price_level = $1", [price]
  );
  return result.rows;
   }

// 5. getTopRatedFoodTrucks()
async function getTopRatedFoodTrucks() {
  const result = await db.query(
    "SELECT * FROM food_trucks WHERE rating >= 4.5",
  );
  return result.rows;
}

// 6. getFoodTrucksSortedByRating()

// 7. getFoodTrucksSortedByPrice()

async function sortedByPrice() {
  const result = await db.query(
    "SELECT name, id, price_level FROM food_trucks ORDER BY price_level DESC",
  );
  console.log(result.rows);
  return result.rows;
}

// API endpoint `/get-food-trucks-sorted-by-price`

// 8. getFoodTrucksCount()
async function getFoodTrucksCount() {
  const result = await db.query("SELECT COUNT(*) FROM food_trucks")
  return result.rows[0];
}
// 9. addOneFoodTruck(name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
async function addOneFoodTruck(
  name,
  current_location,
  daily_special,
  slogan,
  has_vegan_options,
  price_level,
  rating,
) {
  const result = await db.query(
    `INSERT INTO food_trucks
     (name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      current_location,
      daily_special,
      slogan,
      has_vegan_options,
      price_level,
      rating,
    ],
  );

  return result.rows[0];
}

// 10. deleteOneFoodTruck(id)

async function deleteOneFoodTruck(id) {
  // We've passed in an id value from the url which we use to query the server which then loads the data into the 'truckName' variable. This lets me create a more user-centric result.
  // '$1' is a dynamic value loaded with the value of the first item in our array, [id].
  const truckName = await db.query(
    `SELECT name FROM food_trucks WHERE id = $1`,
    [id],
  );

  // Small error handling in case the truck has either already been deleted or did not exist in the first place.
  if (truckName.rows.length === 0) {
    return `No truck found with id ${id}, or name ${truckName}`;
  }

  // This runs only once when we run the function and is the main line of code that actually carries out the deletion of the food truck.
  await db.query(`DELETE FROM food_trucks WHERE id = $1`, [id]);

  const name = truckName.rows[0].name;

  // Both the console log and the return are merely there to return a confirmation to the user and us.
  console.log(`Success! Food truck #${id}, ${name} was deleted!`);

  return `Success! Food truck #${id}, ${name} was deleted!`;
}

// 11. updateFoodTruckLocation(id, newLocation)
async function updateFoodTruckLocation(id, newLocation) {
  const result = await db.query(
    "UPDATE food_trucks SET current_location = $1 WHERE id = $2",
    [newLocation, id],
  );
  return result;
}

// 12. updateFoodTruckRating(id, newRating)

//  This async function updates the rating of the food truck
// we use a async function because it returns a promise automatically
// and allowsmus to use await inside the function
async function updateFoodTruckRating(id, newRating) {

  //  This is a variable called const.
  // await pauses execution until the database finishes updating.
  //db.query(...) sends an SQL UPDATE command to your database.
  const result = await db.query(
    // this is an SQL command that updates the Food_Trucks table 
    // and uses SET RATING  to  update the rating column with the new updated rating 
    // for the row where id matches -> $2.
    // $1 -> gets replaced with newRating, and  $2 -> gets replaced with id
    "UPDATE food_trucks SET rating  = $1 WHERE id = $2",
    //  newRating and id are parameters for receiving input 
    [newRating, id],
  );

  // result is an object returned by the database driver. (returned in the form of anovbject)
  // This Return the query results
  return result;

  }

  // NOTE:
  // return result.rows[0] --->  would return the updated food truck object 
  // if we use the word "returning" at the end of the SQL query above 
  // "UPDATE food_trucks SET rating = $1 WHERE id = $2 RETURNING *"

  // NOTE: 
  //   We could also add a TRY Catch Error Handling to handle errors
 


// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  const trucks = await getAllFoodTrucks();
  res.json(trucks);
});

// 2. GET /get-food-truck-by-id/:id
// endpoint that returns one food truck by its id
app.get("/get-food-truck-by-id/:id", async (req, res) => {
  // gets the id from the URL
  const id = req.params.id;

  // calls the helper function
  const foodTruck = await getFoodTruckById(id);

  // sends the food truck back as JSON
  res.json(foodTruck);
});

// 3. GET /get-vegan-food-trucks

// 4. GET /get-food-trucks-by-price/:price

app.get("/get-food-trucks-by-price/:price", async (req, res) => {
  const price = req.params.price;
  const trucks = await getFoodTruckByPrice(price);
  res.json(trucks);
});

// 5. GET /get-top-rated-food-trucks
app.get("/get-top-rated-food-trucks", async (req, res) => {
  const trucks = await getTopRatedFoodTrucks();
  res.json(trucks);
});

// 6. GET /get-food-trucks-sorted-by-rating

// 7. GET /get-food-trucks-sorted-by-price

app.get("/get-food-trucks-sorted-by-price", async (req, res) => {
  const sortedFoodTruckPrice = await sortedByPrice();
  res.json(sortedFoodTruckPrice);
});

// 8. GET /get-food-trucks-count
app.get("/get-food-trucks-count", async (req, res) => {
  const count = await getFoodTrucksCount()
  res.json(count);
})
// 9. POST /add-one-food-truck
app.post("/add-one-food-truck", async (req, res) => {
  const {
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  } = req.body;

  const truck = await addOneFoodTruck(
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  );

  res.send(`Success! ${truck.name} was added!`);
});

// 10. POST /delete-one-food-truck/:id

// Priscilla's Code

app.post("/delete-one-food-truck/:id", async (req, res) => {
  try {
    // Creates a variable from the ':id' entered in the url.
    let id = req.params.id;

    // Here, a reply will
    const result = await deleteOneFoodTruck(id);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "There was an issue while deleting the food truck. Please review your request and try again",
    });
  }
});
// 11. POST /update-food-truck-location
app.post("/update-food-truck-location", async (req, res) => {
  const id = req.body.id;
  const newLocation = req.body.newLocation;

  await updateFoodTruckLocation(id, newLocation);

  res.send("Success! The food truck location was updated!");
});

// 12. POST /update-food-truck-rating
// app.post defines a POST endpoint / 
// req → contains incoming data (such as parameters)
// res → used to send a response back
 app.post("/update-food-truck-rating", async (req, res) => {

  // Get data sent from the client 
  // req.body holds JSON sent by the client
  // it pulls out  id = which row to update AND newRating = new value
  const id = req.body.id;
  const newRating = req.body.newRating;

  // Call your database function to update the rating, This runs the helper function
  // await makes sure the database is finish running first 
  await updateFoodTruckRating(id, newRating);

  // Send a "Text" response back to the client
  res.send("Success! The food truck rating was updated!");
});

//  NOTE: We can add Try/Catch error handling 
// so if the database fails , error handling can help prevent server from crashing



// ------------------------------------------------------------------



// ✨💖🐼 Secret message from Nicole 🐼💖✨
// Why did the programmer quit their job? Because they didn't get arrays :) *
