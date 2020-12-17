import React, { useState } from "react";
import { Button, Form, ButtonGroup } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { connect } from "react-redux";
import styled from "styled-components";

import { showNotify } from "../redux/notification/notifyActions";
import { save } from "../redux/places/placesActions";

const StyledMapContainer = styled(MapContainer)`
  height: 75vh;
  width: 100%;
  cursor: pointer;
`;

function PlaceEditor({ save, place, showNotify, history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const id = place.id;

  if (id) {
    setTitle(place.title);
    setDescription(place.description);
    setCoordinates(place.coordinates);
  }

  const valid = (title, coordinates, description) => {
    if (!title || !description || !coordinates) {
      showNotify(
        "warning",
        "Need to fill all fields and select coordinates on the map!",
      );
      return false;
    }
    return true;
  };

  function update() {}

  function clear() {
    setTitle("");
    setDescription("");
    setCoordinates(null);
  }

  function savePlace(redirect) {
    if (valid(title, description, coordinates)) {
      save({ id, title, description, coordinates });
      clear();
      if (redirect) {
        history.push("/list");
      }
    }
  }

  function GetCoords() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates({ lat, lng });
      },
    });
    return coordinates === null ? null : <Marker position={coordinates} />;
  }

  const Save = (
    <>
      <Button onClick={() => savePlace(false)}>
        Save and add another place
      </Button>
      <Button onClick={() => savePlace(true)}>
        Save and open list of all places
      </Button>
    </>
  );

  const Update = (
    <Button variant="info" onClick={update}>
      Update this place
    </Button>
  );

  return (
    <>
      <StyledMapContainer
        center={[56.84, 60.615]}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetCoords />
      </StyledMapContainer>
      <div className="p-1">
        <Form className="mt-1">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-1"
            />
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-between">
          <ButtonGroup>{id ? Update : Save}</ButtonGroup>
          <ButtonGroup>
            <Button variant="warning" onClick={clear}>
              Clear
            </Button>
            <Button variant="danger">Remove this place</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  place: state.place,
});

export default connect(mapStateToProps, { save, showNotify })(PlaceEditor);
