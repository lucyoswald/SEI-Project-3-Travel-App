import { Card, Button } from "react-bootstrap";

const ItineraryCard = ({
  activity,
  description,
  link,
  activityCountry,
  price,
  activityId,
}) => {
  return (
    <Card className="itinerary-card" key={activityId}>
      <Card.Body>
        <Card.Title>{activity}</Card.Title>
        <Card.Subtitle>{activityCountry}</Card.Subtitle>
        <Card.Text className="itinerary-card-text">{`£ ${price}`}</Card.Text>
        <Card.Text className="itinerary-card-text">{description}</Card.Text>
        <Card.Link href={link}>{activity}</Card.Link>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ItineraryCard;
