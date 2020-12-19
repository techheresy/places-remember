import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PaginatorBar from "../components/PaginatorBar";
import PlacesPage from "../components/PlacesPage";
import { getPlaces } from "../redux/places/placesActions";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PlacesContainer = styled.div`
  width: 35rem;
  margin-top: 5rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const NoMemoriesMessage = styled.div`
  font-size: 1.5rem;
`;

const SpinnerContainer = styled(Spinner)`
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  width: 3rem;
  height: 3rem;
  left: 0;
  right: 0;
`;

function Places({ places: { places, loading } }) {
  const placesPerPage = Math.floor(window.innerHeight / 150);
  const [currentPlace, setCurrentPlace] = useState(1);

  useEffect(() => {}, [places]);

  if (!loading) {
    return (
      <>
        <SpinnerContainer variant="primary" animation="border" />
      </>
    );
  }

  if (loading) {
    if (places.length) {
      const lastPlace = currentPlace * placesPerPage;
      const firstPlace = lastPlace - placesPerPage;
      const currentPlaces = places.slice(firstPlace, lastPlace);
      const paginate = (placeNum) => setCurrentPlace(placeNum);
      return (
        <Container>
          <PlacesContainer>
            <PaginatorBar
              placesPerPage={placesPerPage}
              totalPlaces={places.length}
              paginate={paginate}
            />
            <PlacesPage places={currentPlaces} />
          </PlacesContainer>
        </Container>
      );
    } else {
      return (
        <Container>
          <PlacesContainer>
            <NoMemoriesMessage>
              <span className="pr-1">No memories!</span>
              <Link to="/add">
                Add new️?️
              </Link>
            </NoMemoriesMessage>
          </PlacesContainer>
        </Container>
      );
    }
  }

  return "";
}

const mapStateToProps = (state) => ({
  places: state.places,
});

export default connect(mapStateToProps, { getPlaces })(Places);
