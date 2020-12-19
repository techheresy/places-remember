import { setPosition } from "leaflet/src/dom/DomUtil";
import React, { useEffect, useState } from "react";
import { Button, Form, ButtonGroup } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { connect } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";

import { showNotify } from "../redux/notification/notifyActions";
import {
  getPlaces,
  savePlace,
  deletePlace,
} from "../redux/places/placesActions";
import { getPlaceByID } from "../utils/apiRequests";

const StyledMapContainer = styled(MapContainer)`
  height: 75vh;
  width: 100%;
  cursor: pointer;
`;

function Editor({ savePlace, deletePlace, showNotify, history, getPlaces }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPlaceByID(id)
        .then(({ data }) => {
          setTitle(data.title);
          setDescription(data.description);
          setCoordinates({
            lat: data.coordinates.coordinates[0],
            lng: data.coordinates.coordinates[1],
          });
        })
        .catch((err) => {
          showNotify("danger", err);
        });
    }
  }, [id]);

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

  function remove(id) {
    deletePlace(id);
    history.push("/places");
  }

  function clear() {
    setTitle("");
    setDescription("");
    setCoordinates(null);
  }

  function save(redirect) {
    if (valid(title, description, coordinates)) {
      savePlace({ id, title, description, coordinates });
      clear();
      if (redirect) {
        history.push("/places");
      }
    }
  }

  function GetCoords() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates({ lat, lng });
      },
    });

    if (coordinates !== null) {
      map.setView(coordinates);
    }

    return coordinates === null ? null : <Marker position={coordinates} />;
  }

  const Save = (
    <>
      <Button onClick={() => save(false)}>Save and add another place</Button>
      <Button onClick={() => save(true)}>
        Save and open list of all places
      </Button>
    </>
  );

  const Update = (
    <Button variant="info" onClick={() => save(true)}>
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
            <Button variant="warning" onClick={() => clear()}>
              Clear
            </Button>
            {id ? (
              <Button variant="danger" onClick={() => remove(id)}>
                Remove this place
              </Button>
            ) : (
              ""
            )}
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default connect(null, { savePlace, showNotify, getPlaces, deletePlace })(
  Editor,
);
