

## SEI Project 3 - MERN Stack Travel App

#### Link to backend [here](https://github.com/lucyoswald/Travel-API).

For project 3, we were asked to work as a group to build a full stack app using the MERN stack. We decided to create a Travel App that allows users to search for a country from our database. Once logged in, the user can discover available activities for that specific country and add these to their own personal itinerary. They also have the ability to add their own activities to the country, there is also a like feature so you can see how many users have liked a country. We created our back-end API using MongoDB and Express. Our group used Excalidraw to map out the project and then throughout the project, JIRA to help allocate tasks and track each other's progress.

#### View the live site [here](https://designmytrip.netlify.app).

## Project Brief: 

* Work in a team, using git to code collaboratively.
* Build a full-stack application by making your own backend and your own frontend
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design
* Have automated tests for at least one RESTful resource on the back-end.

## 🛠 Technologies Used

HTML | CSS | JavaScript | React.js | SCSS | Express | MongoDB | Postman | Bootstrap | JIRA | Excalidraw 

## Timeframe:
2 weeks | Group project

## Planning

### Excalidraw 

We started by mapping out each page and the components, figuring out how many pages we would have and how each would interlink. With a clear understanding of the scope of our project, we then made detailed notes on the function of each page. We also created ‘Schema Town’ and figured out what schema’s we would need early on as we realised we would need quite a few to make our idea work in the backend. 

We identified our stretch goals and were quickly able to distinguish what was more important (getting the MVP down first). Then looking ahead to adding stretch goals if we had time - communicating together what to prioritise early on helped with stress + task allocation. I think the planning process is so key as it really sets you up for the rest of the project. 

<img width=110% src="https://user-images.githubusercontent.com/116687424/231489197-d9aed7e2-d457-45c9-b439-ad3545a2d949.png">
<img width=110%  src="https://user-images.githubusercontent.com/116687424/231490666-a79e3588-ce2b-4566-af38-2792b88cc7e3.png">
<img width=110%  src="https://user-images.githubusercontent.com/116687424/231490127-d8ecce5f-a3db-41d6-b2aa-502e32b81575.png">


### JIRA  

We also used JIRA, the Project Management tool, to effectively allocate tasks and monitor progress. This proved to be a transformative experience, as it allowed us to delegate specific responsibilities and closely track each stage of the project. We were able to work collaboratively and support each other when certain tasks were taking longer than expected. This helped us stay on track and ensured that we could complete the project on time and within the established parameters, overall really pleased we decided to utilise it. 

<img width=90%  src="https://user-images.githubusercontent.com/116687424/231492793-c3abf95f-5c7b-491c-b390-20d92f92218e.jpg">


## Build/Code Process

### Backend:

### Task Allocation: 
I'll provide concrete instances of the code I developed, as each team member was responsible for their respective pages or components. However, we collaborated as a group on several aspects of the project, making it a collective effort. The commits on Github allow you to see the contributions made by each member of the team.

### Overview: 
I would say some of the main talking points re our backend would be the controllers we built out and the seeding data. This is where we spent most of our time updating and changing things. 
In the backend we built out the models and set up the controllers. 

Our country controller gets all the country data and finds a country by a specific id using GET. Our Itinerary controller holds the endpoints that allows users to update, create and delete their itinerary, using POST, PATCH, DELETE.  Our user controller handles all the user endpoints, a few specifically linked to the itinerary controller to allow the application to find the user in order to update, create and remove an itinerary. The user controller also handles our login and register endpoints. 

### Activity Controller
I created the activity controller, which has three methods for handling the activity data. The addActivity method is a POST request that adds a new activity to the database by creating a new document in the Activity collection and updating the corresponding Country document with the new activity ID. The updateActivity method is a PATCH request that updates an existing activity in the database. It checks whether the authenticated user has permission to update the activity based on their role and whether they created the activity. The deleteActivity method is a DELETE request that deletes an activity from the database. It checks whether the authenticated user has permission to delete the activity based on their role and whether they created the activity. If an error occurs, the method passes the error to the next middleware function to handle it. We actually didn’t get round to adding the delete functionality on the frontend but it's all set up in the backend for future improvements.

``` js
import Activity from "../models/Activity.js";
import Country from "../models/Country.js";

// ADD a new activity

const addActivity = async (req, res, next) => {
  const newActivity = { ...req.body, createdBy: req.currentUser.id };
  // console.log(req.currentUser);
  // console.log(newActivity);

  try {
    const addedActivity = await Activity.create(newActivity);
    // console.log(addedActivity);
    // console.log(`this is the country id ${newActivity.activityCountry}`);
    const countryToAddTo = await Country.findById(newActivity.activityCountry);
    if (!countryToAddTo) {
      return res.status(404).json({ message: "Country not found." });
    }
    console.log(countryToAddTo);
    // console.log(`addedActivity id ${addedActivity.id}`);
    countryToAddTo.activities.push(addedActivity.id);
    const activityAdded = await countryToAddTo.save();

    return res.status(200).json({
      message: "Successfully created a new activity in our database!",
      activityAdded,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE an activity

const updateActivity = async (req, res, next) => {
  const id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const foundActivity = await Activity.findById(id);

    if (!foundActivity) {
      return res.status(404).json({
        message: `Can't find activity with id ${id}, please try again!`,
      });
    }

    if (
      req.currentUser.id !== foundActivity.createdBy.toString() &&
      req.currentUser.role != "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized user" });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(id, dataToUpdate, {
      returnDocument: "after",
    });

    return res
      .status(200)
      .json({ message: `Activity ${updatedActivity} has been updated!` });
  } catch (err) {
    next(err);
  }
};
// DELETE an activity

const deleteActivity = async (req, res, next) => {
  const { id } = req.params;

  if (req.currentUser.role != "admin") {
    return res.status(403).json({
      message:
        "Only admins or users that created this specific activity can delete entries!",
    });
  }

  try {
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (deletedActivity) {
      return res
        .status(200)
        .json({ message: "Activity was deleted", deletedActivity });
    } else {
      return res.status(404).json({
        message: `No activity with that id ${id} has been found, please try again!`,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  addActivity,
  updateActivity,
  deleteActivity,
};
```



### Update activity in the backend 

In the backend in the userController within the login endpoint I also added the functionality to check the ‘role’ in the localStorage so that we could determine who the user was in order to figure out whether they were the owner of the activity they were trying to update or if they were an admin, this works alongside the code I implemented in the front end.


``` js

    const payload = { id: user.id };

    const token = jwt.sign(payload, JWT_SECRET);
    console.log(token);
    return res.status(200).json({
      message: `${user.userName} is now logged in`,
      userId: `${user._id}`,
      role: `${user.role}`,
      token,
    });
  } catch (err) {
    next(err);
  }
};

```

### Backend like button
Something I’m proud of is the like button I created, this was definitely a stretch goal so I was pleased I managed to figure it out in time. In our user controller I created a function called userlikedCountries that would update the likedCountries array that is in the user model. If the user is found, the function extracts the user's current list of liked countries (foundUser.likedCountries) and checks if the new country provided is already in the list. If it is, the function removes the country from the list using the Array.splice() method.

If the new country is not in the list, the function adds the country to the list using the Array.push() method. Finally, the function saves the updated foundUser object with the new liked countries list using the foundUser.save() method, and stores the updated object in the updatedLikes constant. 

``` js
const userlikedCountries = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const country = req.body.country;
  console.log(req.body);
  try {
    const foundUser = await User.findById(id);
    console.log(foundUser);
    if (!foundUser) {
      return res.status(404).json({ message: `No user found with ${id}.` });
    }
    const listedCountries = foundUser.likedCountries;
    if (listedCountries.includes(country)) {
      const index = listedCountries.indexOf(country);
      if (index !== -1) {
        listedCountries.splice(index, 1);
      }
    } else {
      foundUser.likedCountries.push(country);
    }

    const updatedLikes = await foundUser.save();

    return res.status(200).json({
      message: "The liked countries array has been updated",
      updatedLikes,
    });
  } catch (err) {
    next(err);
  }
};

```
Then in the country controller, I created a function called countryLikes that would update the numberOfLikes array that is connected to the country model. The function extracts the id and numberOfLikes from the req.params and req.body respectively. It then attempts to find a country by the provided id using the Country.findByIdAndUpdate method. If the country is found, the function updates the numberOfLikes field in the found country object with the value provided in the request body.The function then saves the updated country object with the new numberOfLikes value and stores the updated object in the foundCountry constant.

``` js
const countryLikes = async (req, res, next) => {
  //Declare new item in my body
  //The value  of that will determine whether its to count up or count down
  //Then you need an if statement to check the value of the that field
  //

  const { id } = req.params;
  console.log(req.params);
  console.log("Req.body", req.body);
  const { numberOfLikes } = req.body;

  try {
    console.log({ numberOfLikes });
    const foundCountry = await Country.findByIdAndUpdate(
      id,
      { numberOfLikes },
      {
        returnDocument: "after",
      }
    );
    console.log(foundCountry);
    if (!foundCountry) {
      return res
        .status(404)
        .json({ message: `No country with that ${id} has been found` });
    } else {
      return res.status(200).json({
        message: `Like button updated`,
        foundCountry,
      });
    }
  } catch (err) {
    next(err);
  }
};

```
### Frontend

### Task Allocation
Similar to the backend, we had specific pages/components assigned to us individually, but as a team, we collaborated on several other aspects of the project. It was a genuine group endeavor. The commits on Github provide a record of each team member's contributions. While I'll showcase some of the code I worked on, it's not feasible to display everything. Moreover, I also contributed significantly to the overall styling of the front-end.

### Overview
Our website has several pages that users can access to search and explore different countries and activities. The homepage includes a search function to search for countries in our database. The allcountries page displays a list of all the countries in our database. When a user clicks on or searches for a specific country, they will be directed to the individual country page, which includes information about the country and available activities. We use the countrycard component for the specific country page and the allcountriescard component for the all countries page. The itinerary page displays a user's chosen activities, and we use the itinerary card component for this page. Additionally, we have a login and sign up page for user authentication. Our website also includes a header and footer component, as well as an activity carousel component for displaying activities on the individual country page. Finally, we have implemented a loading visual component from Bootstrap that appears on all of our pages.


### Homepage 

### Searchbar 
* For the homepage we created the search bar -  the fetchData function uses Axios to make a GET request to the API endpoint that searches for countries with a name that matches the value in the search bar (searchName). 
* If the request is successful, it processes the data to extract the country name and ID, sets the isLoading state to false, and updates the searchForm state with the cleaned data.
* If the request fails, it sets the showError state to true and isLoading to false. 
* This function is called when the form is submitted. It first prevents the default form submission behaviour, which would cause the page to refresh. 
* Then, it retrieves the value entered by the user in the form's input field and trims any white space. 
* Next, it checks if the input value is not empty. If it is not empty, it filters the searchForm array using the filter method, searching for any countries whose name includes the input value, ignoring case sensitivity. 
* If the filtered array has a length greater than 0, it logs the countryId property of the first element in the filtered array to the console and navigates the user to a new page, passing in the countryId in the URL. 
* If the filtered array is empty, it sets the showError state to true, indicating to the user that no matching countries were found.

``` js
import { useEffect, useState } from "react";
import axios from "axios";
import home_background_image from "../assets/Pretty archway.jpg";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts";
import LoadingVisual from "../components/LoadingVisual";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchForm, setSearchForm] = useState([]);
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setSearchName(e.target.value);
    console.log(e.target.value);
  };
  console.log(searchName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/countries?name=${searchName}`
        );
        const countryData = data.data;
        console.log(countryData);
        const cleanedData = countryData.map((country) => {
          return {
            countryName: country.name,
            countryId: country._id,
          };
        });
        setIsLoading(false);
        setSearchForm(cleanedData);
      } catch (e) {
        console.log("This isn't working");
        setShowError(true);
        setIsLoading(false);
      }
    };
    fetchData();
    console.log(searchForm);
  }, [searchName]);

  function onSubmitForm(e) {
    e.preventDefault();
    const inputVal = e.target.elements.country.value.trim();
    if (inputVal) {
      const filteredCountry = searchForm.filter((country) =>
        country.countryName.toLowerCase().includes(inputVal.toLowerCase())
      );
      if (filteredCountry.length > 0) {
        console.log(filteredCountry[0].countryId);
        navigate(`/countries/${filteredCountry[0].countryId}`);
      } else {
        setShowError(true);
      }
    }
  }
```


### Navigate 

I added navigation functionality to the sign-up and login buttons located at the bottom of the page. This provided a realistic user experience, as it is a common feature in real-life applications. Please refer to the code below. 



``` js

  return (
    <div className="home">
      {isLoading ? (
        <div className="loading">
          <LoadingVisual />
        </div>
      ) : (
        <>
          <img
            src={home_background_image}
            alt="Background image"
            className="home_background_image"
          />

          <h4 className="home_header">Where would you like to go?</h4>

          <section>
            <form className="input_form" onSubmit={onSubmitForm}>
              <input
                className="country_search"
                type="text"
                placeholder="Type in your country..."
                onChange={onChange}
                name="country"
              ></input>

              <button type="submit" className="submit_button">
                Submit
              </button>
            </form>
            {showError && (
              <div className="container p-5 error">
                <div
                  className="alert alert-danger alert-dismissible fade show errorbox"
                  role="alert"
                >
                  <strong>
                    We apologize, the country you have selected cannot be found
                    within our database
                  </strong>
                  <button
                    type="button"
                    className="close closebutton"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShowError(false)}
                  >
                    <span aria-hidden="True">&times;</span>
                  </button>
                </div>
              </div>
            )}
            <section className="signup_login_buttons">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="SignUp_button"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="LogIn_button"
              >
                Log In
              </button>
            </section>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;

```

### Frontend - Like Button

In the frontend I created the like button using the React Heart component from the react-heart package. The heart is used to create a button that toggles the like/unlike functionality for the country card. 


Before the heart can be liked or unliked the code checks if there are any countries already stored in the local storage by calling localStorage.getItem("localStorageCountries"). If there are countries stored in the local storage, it checks if the current country's name is included in the lsCountries array by using the includes method. If the current country is already in the lsCountries array, it sets the active state to true, meaning that the user has already liked the country. If not, it sets the active state to false. This check is important to ensure that the user cannot like or unlike a country that they have already liked or unliked before. By checking the lsCountries array in the local storage, the code is able to persist the liked/unliked status of a country even after the user leaves the page or closes the browser.


When the user clicks the Heart component, the likeButton function is called, which sends a PATCH request to the server to update the number of likes for the current country card. The active state is toggled to reflect the current status of the button, and the numOfLikes state is updated with the new number of likes returned from the server response.


The isActive prop is set to the active state, which determines the current status of the button (liked or not liked). The onClick prop is set to the likeButton function, which is called when the button is clicked. The animate prop is set to true to enable the animation of the heart button. The className prop is set to "like_button" to apply the relevant styles to the button.

``` js
const CountryCard = ({ country }) => {
  const lsCountries = localStorage.getItem("localStorageCountries");
  const [active, setActive] = useState(
    lsCountries
      ? lsCountries.includes(country.countryData.name)
        ? true
        : false
      : false
  );
  const [numOfLikes, setNumOfLikes] = useState(
    country.countryData.numberOfLikes
  );
```
``` js
const likeButton = async () => {
    const id = country.countryData._id;

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await axios.patch(`${API_URL}/userlikes/${userId}`, {
        country: country.countryData.name,
      });
      console.log(res);

      const localStorageCountries = res.data.updatedLikes.likedCountries;

      localStorage.setItem("localStorageCountries", localStorageCountries);

      console.log(localStorageCountries);

      //country id in the route
      const response = await axios.patch(
        `${API_URL}/countries/${id}/likes`,
        { numberOfLikes: active ? numOfLikes - 1 : numOfLikes + 1 },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      // console.log(data);
      //append the country onto the likedCountries array
      setActive(!active);
      setNumOfLikes(response.data.foundCountry.numberOfLikes);
      console.log("Liked!");
    } catch (err) {
      console.log(err);
    }
  };
  ```
  ``` js
<div
   style={{
       position: "absolute",
       bottom: "1rem",
       right: "1rem",
       marginRight: "0.8rem",
       }}
 >
 <div style={{ width: "2rem" }}>
 <Heart
    isActive={active}
      onClick={() => {
       console.log(active);
         // setActive(!active);
           likeButton();
          }}
       animationTrigger="both"
                          
          inactiveColor="rgba(255,125,125,.75)"
                   activeColor="#FFB6C1"
                      animationDuration={0.1}
                          className="heart"
                        />
                    <p
              style={{
                marginLeft: "12px",
                  marginTop: "2px",
                   }}
              >
                     {numOfLikes}
                         </p>
                           </div>
                         </div>

  ```
  
  
### Bootstrap

I used bootstrap to create the activity carousel in order to display the activities in a user friendly way, so they could click through each one but also so they swipe between each one on a timer. We also implemented bootstrap for all our cards, the loading visual and the the responsive nav bar. 



### Update Activity Button & Errors

I created an Auth file in my frontend, which is used to retrieve the user's ID from a JWT stored in the browser's local storage. When the function is called it retrieves the JWT from the "token" key in local storage using localStorage.getItem("token"). If the token is not found, the function returns false. If the token is present, the function decodes it using the jwt_decode library. The decoded token includes the user's ID as its payload, which is accessed using decodedToken.id. This ID is then returned from the function. The returned user ID is then used to identify the currently logged in user and decide whether or not they can update the activity, depending on if they created the activity or if they hold an ‘admin’ role. I believe this is a useful solution for dealing with authentication, such as displaying user-specific data or restricting access to certain pages.

 ``` js

import jwt_decode from "jwt-decode";

export function getLoggedInUser() {
  if (!localStorage) return false;

  const token = localStorage.getItem("token");
  if (!token) return false;
  const decodedToken = jwt_decode(token);
  console.log(decodedToken);
  const userId = decodedToken.id;
  return userId;
}
 ```
 
 I was responsible for creating most of the visual error handlers within the application. As you'll see below I set up error handlers for the update button that checked whether the user clicking the update button was either the creator or the admin for that specific activity. This was necessary to determine whether or not they had the authority to update it. Additionally, the error handlers verified if the user was logged in and displayed relevant error pop-ups based on the authentication issue.
 I am using this code as an example for the error as this is the boiler plate code I created with the “container p-5 error” imported from bootstrap and then edited in scss to fit my needs. I used this several times throughout the project for errors imending it slightly each time.
 
  ``` js
 {showError && (
          <div
            className="container p-5 error"
            style={{ position: "absolute", marginTop: "300px", width: "300px" }}
          >
            <div
              className="alert alert-danger alert-dismissible fade show errorbox"
              role="alert"
            >
              <strong>
                {" "}
                {showError === "not created"
                  ? "You are not the creator of this activity!"
                  : showError === "not logged in"
                  ? "Sorry, you need to login before you can update an activity."
                  : null}
              </strong>
              <button
                type="button"
                className="close closebutton"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowError(false)}
              >
                <span aria-hidden="True">&times;</span>
              </button>
            </div>
          </div>
        )}
        
```

### Read More / Read Less

I also added the read more/ read less detail to the activities card so the user can click to see more or less of the description. I did this by creating a state called readMore and then set it to false using the useState hook. Then, in the Card.Text element, I use the ternary operator to conditionally render the activity description. If readMore is true, the full description is displayed using activity.description. If readMore is false, only the first 200 characters of the description are displayed using activity.description.slice(0, 200).If the length of the description is greater than 200 characters, I also render the "Read More" button using a span element with the read-more class. When this button is clicked, the toggleReadMore function is called which  allows the user to view either a truncated or full description of the activity.

 ``` js
 <Card.Text className="activity_text">
            <p style={{ display: "inline-block" }}>
              {readMore
                ? activity.description
                : activity.description.slice(0, 200)}
              {activity.description.length > 200 && (
                <span className="read-more" onClick={toggleReadMore}>
                  {readMore ? " ...Read Less" : " ...Read More"}
                </span>
              )}
            </p>
            <br />
            <br />
            <span> {activity.location}</span>
            <br /> <span>Cost: £{activity.price}</span>
            <Button
              onClick={() => {
                addedToIStyling();
                addToItinerary(activity._id);
              }}
              variant="primary"
              className="cardbutton"
              style={{
                position: "absolute",
                bottom: "10px",
              }}
            >
            
```
            
## Finished Product:

https://github.com/lucyoswald/Travel-App/assets/116687424/abf1dca5-d5ba-4b2c-85da-abb0fd1278b0



## Wins & Challenges

### Wins:

* As individuals and a group, we are delighted with the project's outcome.
* Our team collaborated effectively, and we genuinely enjoyed working together.
* I think we did a really good job trying to implement bootstrap, this was totally new to us so I feel pleased we were able to make this work as it was definitely alien and took some getting used to. 

### Challenges: 

* This project overall was generally very challenging as this was our first time building out the backend and the frontend totally on our own. 
* We also learned to use Git as a group for the first time, learning how to use the tool effectively with branches and resolve merge conflicts when necessary - this was definitely a frequent problem that arose as occasionally we would be working on the same page/component. 
* We adopted Bootstrap for the project, which was a valuable skill to learn. However, it came with its challenges as its built-in styles were difficult to override, and we had to work hard to make the framework meet our design requirements.

## Key Learnings

I think some of the key learnings during this project was definitely focused around working as a group for the first time, communication is key. Figuring out the best way to split up the work, we had frequent progress calls just to make sure we were on track and see if anyone needed more or less work. I think we were able to provide honest feedback to one another and could always rely on one another with any concerns we had during the project. On the technical side, building out both the front-end and the back-end was a significant learning experience. Seeing an application function from both perspectives was fulfilling, and we all felt that things began to fall into place more easily. 


## Future Improvements

* Having some blanket user profiles on the page would be nice for the user - being able to view what countries they liked.
* A feature we really wanted to implement but just didn’t have time to was the ability to email your created itinerary to yourself - we didn’t get round to this but it would be a great feature to have.
* Adding further seeding data so more activities are available for users + further countries.
* Adding the delete button to the activity card.




