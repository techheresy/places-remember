import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";

import { closeNotify } from "../redux/notification/notifyActions";

const NotificationContainer = styled.div`
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

function Notification({ notify: { showed, variant, message }, closeNotify }) {
  useEffect(() => {
    if (showed) {
      const timer = setTimeout(() => {
        closeNotify();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [closeNotify, showed]);

  if (showed) {
    return (
      <NotificationContainer>
        <Alert variant={variant} onClose={() => closeNotify()} dismissible>
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      </NotificationContainer>
    );
  }
  return null;
}

const mapStateToProps = (state) => ({
  notify: state.notify,
});

export default connect(mapStateToProps, { closeNotify })(Notification);
