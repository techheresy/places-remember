import React from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "styled-components";

import { showNotify } from "../redux/notification/notifyActions";
import { deletePlace } from "../redux/places/placesActions";
import truncate from "../utils/truncate";

const Pencil = styled.span`
  font-size: 1.2rem;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const PlacesPage = ({ places, history, deletePlace }) => {
  return (
    <>
      {places.map((place, index) => {
        return (
          <Toast
            key={index}
            style={{ maxWidth: "40rem" }}
            onClose={() => deletePlace(place.id)}>
            <Toast.Header style={{ background: "none" }}>
              <strong className="mr-auto">{truncate(place.title, 35)}</strong>
              <Pencil onClick={() => history.push(`/edit/${place.id}`)}>
                ✎
              </Pencil>
            </Toast.Header>
            <Toast.Body className="d-flex justify-content-between">
              <span>{truncate(place.description, 40)}</span>
            </Toast.Body>
          </Toast>
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => ({
  editor: state.editor,
});

export default withRouter(
  connect(mapStateToProps, { showNotify, deletePlace })(PlacesPage),
);
