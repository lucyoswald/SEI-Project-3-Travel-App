import { Carousel } from "react-bootstrap";
import ActivityCard from "./Activity";

const ActivityCarousel = ({ activities }) => {
  return (
    <div className="individual_country__activity">
      <div>
        {/* <h2 className="activities_header">Activities</h2> */}
        <div className="categories-container">
          {Array.from(
            new Set(activities.map((activity) => activity.category))
          ).map((category) => (
            <div key={category} className="category_box">
              <h3 className="category_header">{category}</h3>
              <Carousel style={{ marginTop: "30px" }}>
                {activities
                  .filter((activity) => activity.category === category)
                  .map((activity) => (
                    <Carousel.Item key={activity._id}>
                      <ActivityCard activity={activity} />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityCarousel;
