import { Card, Button } from "react-bootstrap";

const ItineraryCard = ({
  activity,
  description,
  link,
  // activityCountry,
  price,
  activityId,
  deleteActivity,
}) => {
  return (
    <Card className="itinerary-card" key={activityId}>
      <Card.Body>
        <Card.Title>{activity}</Card.Title>
        {/* <Card.Subtitle>{activityCountry}</Card.Subtitle> */}
        <Card.Text className="itinerary-card-text">{`£ ${price}`}</Card.Text>
        <Card.Text className="itinerary-card-text">{description}</Card.Text>
        <div className="link-button-container">
          <Card.Link className="itinerary-card-link" href={link}>
            {activity}
          </Card.Link>
          <Button
            value={activityId}
            className="itinerary-card-button"
            variant="danger"
            onClick={deleteActivity}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItineraryCard;
