const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = PROCESS.ENV.MONGODB_URI;

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2

    Recipe.create({
      title: "Fried Egg",
      level: "Easy Peasy",
      ingredients: ["1 egg", "1 tbsp extra virgin olive oil"],
      cuisine: "Universal",
      dishType: "main_course",
      image:
        "https://www.bhg.com.au/media/6771/friedeggnouf02-1.jpg?width=606&height=0&mode=crop&center=0.5,0.5",
      duration: 5,
      creator: "Chef Jane",
    })
      .then((recipe) => console.log("This recipe is called", recipe.title))
      .catch((err) => console.log(err));
  })
  .then(() => {
    // Iteration 3
    Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) =>
          console.log("This recipe is called", recipe.title)
        );
      })
      .then(() => {
        // Iteration 4
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then(() => {
            console.log("Rigatoni alla Genovese duration updated!");
            // Iteration 5
            Recipe.findOneAndDelete({ title: "Carrot Cake" })
              .then(() => console.log("Carrot Cake deleted!"))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .then(() => {
    // Iteration 6 - Close the Database
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
