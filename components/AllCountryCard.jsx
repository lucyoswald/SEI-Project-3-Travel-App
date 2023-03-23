import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllCountryCard = ({
  countryName,
  countryId,
  image,
  text,
  numbOfActivities,
}) => {
  return (
    <li className="country-card" key={countryId}>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{countryName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {numbOfActivities} activties
          </Card.Subtitle>
          <Card.Text>{text}</Card.Text>
          <Button
            className="activities-button"
            as={Link}
            to={`/countries/${countryId}`}
            variant="primary"
          >
            See all activities
          </Button>
        </Card.Body>
      </Card>
    </li>
  );
};

export default AllCountryCard;
