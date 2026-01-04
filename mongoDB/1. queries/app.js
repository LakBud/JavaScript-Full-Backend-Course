import mongoose from "mongoose";
import { DB_URL } from "./config.js";

// DB_URL is a env, go to config.js for more info

// Connecting the cluster to your code
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database is connected successfully"))
  .catch((e) => console.log(e));

// Creating a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// Create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    // * Create a new document

    // Alternative 1
    const newUser = await User.create({
      name: "User",
      email: "User@gmail.com",
      age: 25,
      isActive: true,
      tags: ["Developer", "Designer"],
    });

    // Alternative 2
    // const newUser = new User({
    //   name: "Buckaroo",
    //   email: "Buckaroo@gmail.com",
    //   age: 25,
    //   isActive: true,
    //   tags: ["Fake Developer", "Designer", "Manager"],
    // });
    // await newUser.save();

    // ---

    console.log("Created a new user:", newUser);

    // ? Methods
    // * Find all users
    // const allUsers = await User.find({});
    // console.log(allUsers);

    // * Find users who are active
    // const getUserOfActiveFalse = await User.find({ isActive: true });
    // console.log(getUserOfActiveFalse);

    // * Get users with the name John Doe
    // const getJohnDoeUser = await User.find({ name: "John Doe" });
    // console.log(getJohnDoeUser);

    // * Get newly created User by ID
    // const getLastCreatedUserbyUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserbyUserId);

    // * Select all users with only their name and email
    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);

    // * Paginate Users
    // const limitedUsers = await User.find({}).limit(5).skip(1);
    // console.log(limitedUsers);

    // * Sort Users by age
    // const sortedUsers = await User.find().sort({ age: 1 });
    // console.log(sortedUsers);

    // * Filter Users
    // const countDocuments = await User.countDocuments({ isActive: true });
    // console.log(countDocuments);

    // * Delete a User
    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("Deleted user:", deletedUser);

    // * Update a User
    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 1000 },
        $push: { tags: "Updated" },
      },
      { new: true }
    );

    console.log("Updated user:", updateUser);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
