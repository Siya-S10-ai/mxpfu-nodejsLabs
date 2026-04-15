const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gmail.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gmail.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to find users whose email matches
  // the extracted email parameter
  let filtered_users = users.filter((user) => user.email === email);
  // Send the filtered_users array as the response to the client
  res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Push a new user into the users array based on query parameters from the request
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
/**We should first look at the user with the specified
 * email ID and then modify it. 
 */
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided
    let DOB = req.params.DOB;
    if(DOB) {
      filtered_users = DOB;
    }
     /**Include similar code here for updating other attributes as needed */
    // Extract and update firstName if provided
    let firstName = req.query.firstName;
    if (firstName) {
      filtered_user.firstName = firstName;
    }

    // Extract and update lastName if provided
    let lastName = req.query.lastName;
    if (lastName) {
      filtered_user.lastName = lastName;
    }

     // Replace old user entry with updated user
     users = users.filter((user) => user.email != email);
     users.push(filtered_users);

     // Send success message indicating the user has been updated
     res.send(`User with the email ${email} has been updated.`);
  } else {
    // Send error message if no user is found
    res.send(`No user found with the email ${email}`);
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  
});

module.exports=router;
