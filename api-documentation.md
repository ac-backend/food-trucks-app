
# 📘 Animals API Documentation

**Base URL:** `http://localhost:3000`

## Overview

| Resource  | Method | Endpoint                         | Description                                 |
| --------- | ------ | -------------------------------- | ------------------------------------------- |
| `animals` | GET    | `/get-all-animals`                 | Retrieves all animals from the database.    |
| `animals` | GET    | `/get-one-animal-by-name/:name`    | Retrieves one animal by its name.           |
| `animals` | GET    | `/get-one-animal-by-id/:id`        | Retrieves one animal by its id number.      |
| `animals` | GET    | `/get-newest-animal`               | Retrieves the most recently added animal.   |
| `animals` | GET    | 🌟 `/get-all-mammals`                 | Retrieves all animals where category = 'mammal'. |
| `animals` | GET    | 🌟 `/get-animals-by-category/:category` | Retrieves all animals in a given category. |
| `animals` | POST   | `/delete-one-animal/:id`           | Deletes one animal by its id number.        |
| `animals` | POST   | `/add-one-animal`                  | Adds a new animal to the database.          |
| `animals` | POST   | `/update-one-animal-name`          | Updates the name of an existing animal.     |
| `animals` | POST   | `/update-one-animal-category`      | Updates the category of an existing animal.|
| `animals` | POST   | 🌟 `/add-many-animals`      | Adds multiple animals to the database.|

---

## Database Schema

```sql
CREATE TABLE food_trucks (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    current_location VARCHAR,
    daily_special VARCHAR,
    slogan VARCHAR,
    has_vegan_options BOOLEAN
);
```

Sample seed data:

```sql
INSERT INTO food_trucks (id, name, current_location, daily_special, slogan, has_vegan_options) VALUES
(1, 'Bert''s Beets', 'Farmer''s Market, Oak & 3rd', 'The Crimson Devastator — beet soup served inside of hollowed out beets', 'You WILL taste the earth.', true),
(2, 'Nacho Average Nacho', 'Parked outside the DMV on Elm St', 'The Existential Crisis — 4lbs of nachos with toppings you didn''t ask for but probably needed', 'You''ve been waiting two hours. You deserve this.', false),
(3, 'Wrapscallion', 'Business Park Lot C', 'The LinkedIn Wrap — grilled chicken, unsolicited advice, and a side of ''circling back''', 'Disrupting the wrap vertical since 2019.', true),
(4, 'Pita Party', 'Outside the gym on Maple Ave', 'The Plus One — stuffed pita with roasted veggies, tzatziki, and a second pita nobody invited but everyone was glad showed up', 'Everyone''s welcome. Especially carbs.', true),
(5, 'Grill Murray', 'Film festival grounds, West Pavilion', 'The Groundhog Day Special — same burger as yesterday. And the day before.', 'No one will ever believe you ate here.', false),
(6, 'Cluck Norris', 'Corner of Pain Ave and Delicious Blvd', 'The Roundhouse — a chicken sandwich so spicy it has its own criminal record', 'Heat so intense, it has a black belt.', false),
(7, 'Roll With It', 'Convention Center food court annex', 'The Commitment — a sushi burrito the size of a forearm that requires both hands and a life decision', 'You said you weren''t that hungry. We don''t believe you.', true),
(8, 'Fry Hard: With a Vengeance', 'Stadium parking lot, Gate 4', 'The Yippee-Ki-Fry — loaded waffle fries with pulled pork and ''I can''t believe this is legal'' sauce', 'Welcome to the fry, pal.', false),
(9, 'The Meltdown', 'Corner of Main & 5th, next to the pigeons', 'The Structural Failure — a grilled cheese so loaded with toppings it collapses before it reaches your mouth, served with soup for the aftermath', 'It will fall apart. That''s the point.', true),
(10, 'Batter Up', 'Downtown Arts District, Vine & 2nd', 'The Grand Slam — a savory waffle stacked with fried chicken, hot honey, and pickles, served with a tiny baseball helmet full of mac and cheese', 'Step up to the plate. We''re ready.', false);
```

---

## Animals

### 🔹 GET `/get-all-animals`

**Description:** Retrieves all animals stored in the database.  
**Example Request URL:**  
`GET http://localhost:3000/get-all-animals`  

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Lion",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "land"
  },
  {
    "id": 2,
    "name": "Eagle",
    "category": "bird",
    "can_fly": true,
    "lives_in": "air"
  },
  {
    "id": 3,
    "name": "Dolphin",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "water"
  }
]
```

### 🔹 GET `/get-one-animal-by-name/:name`

**Description:** Retrieves one animal by its name.  

**Example Request URL:**  
`GET http://localhost:3000/get-one-animal-by-name/Eagle`  

**Example Response:**

```json
{
  "id": 2,
  "name": "Eagle",
  "category": "bird",
  "can_fly": true,
  "lives_in": "air"
}
```

### 🔹 GET `/get-one-animal-by-id/:id`

**Description:** Retrieves one animal by its id number.  

**Example Request URL:**  
`GET http://localhost:3000/get-one-animal-by-id/4`  

**Example Response:**

```json
{
  "id": 4,
  "name": "Frog",
  "category": "amphibian",
  "can_fly": false,
  "lives_in": "land"
}
```

### 🔹 GET `/get-newest-animal`

**Description:** Retrieves the most recently added animal.  

**Example Request URL:**  
`GET http://localhost:3000/get-newest-animal`  

**Example Response:**

```json
{
  "id": 10,
  "name": "Crocodile",
  "category": "reptile",
  "can_fly": false,
  "lives_in": "water"
}
```

### 🌟 GET `/get-all-mammals`

**Description:** Retrieves all animals where the category is 'mammal'.  

**Example Request URL:**  
`GET http://localhost:3000/get-all-mammals`  

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Lion",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "land"
  },
  {
    "id": 3,
    "name": "Dolphin",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "water"
  },
  {
    "id": 4,
    "name": "Bat",
    "category": "mammal",
    "can_fly": true,
    "lives_in": "air"
  },
  {
    "id": 7,
    "name": "Elephant",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "land"
  }
]
```

### 🌟 GET `/get-animals-by-category/:category`

**Description:** Retrieves all animals in the given category.  

**Example Request URL:**  
`GET http://localhost:3000/get-animals-by-category/bird`  

**Example Response:**

```json
[
  {
    "id": 2,
    "name": "Eagle",
    "category": "bird",
    "can_fly": true,
    "lives_in": "air"
  },
  {
    "id": 9,
    "name": "Penguin",
    "category": "bird",
    "can_fly": false,
    "lives_in": "land"
  }
]
```

### 🔹 POST `/delete-one-animal/:id`

**Description:** Deletes one animal by its id number.  

**Example Request URL:**  
`POST http://localhost:3000/delete-one-animal/2`  

**Example Response:**

```
Success! Eagle was deleted!
```

### 🔹 POST `/add-one-animal`

**Description:** Adds a new animal to the database.  

**Example Request URL:**  
`POST http://localhost:3000/add-one-animal`  

**Example Request Body:**

```json
{
  "name": "Tiger",
  "category": "mammal",
  "can_fly": false,
  "lives_in": "Jungle"
}
```

**Example Response:**

```
Success! Tiger was added!
```

### 🔹 POST `/update-one-animal-name`

**Description:** Updates the name of an existing animal in the database using its `id`.  

**Example Request URL:**  
`POST http://localhost:3000/update-one-animal-name`  

**Example Request Body:**

```json
{
  "id": 4,
  "newName": "Unicorn"
}
```

**Example Response:**

```
Success! The animal's name was updated!
```

### 🔹 POST `/update-one-animal-category`

**Description:** Updates the category of an existing animal in the database using its `id`.  

**Example Request URL:**  
`POST http://localhost:3000/update-one-animal-category`  

**Example Request Body:**

```json
{
  "id": 4,
  "newCategory": "fish"
}
```

**Example Response:**

```
Success! The animal's category was updated!
```

### 🌟 POST `/add-many-animals`

**Description:** Adds multiple animals to the database. 

**Example Request URL:**  
`POST http://localhost:3000/add-many-animals`  

**Example Request Body:**

```json
{
  "animals": [
    { "name": "Penguin", "category": "bird", "can_fly": false, "lives_in": "water" },
    { "name": "Elephant", "category": "mammal", "can_fly": false, "lives_in": "land" }
  ]
}
```

**Example Response:**

```
Success! The animals were added!
```
