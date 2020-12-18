import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import styled from "styled-components";

import { loginUser } from "../redux/login/loginActions";

const RootContainer = styled.div`
  width: 20rem;
  height: 10rem;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -70px 0 0 -170px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Login(props) {
  useEffect(() => {
    if (props.login.isAuthenticated) {
      props.history.push("/list");
    }
  }, [props.login.isAuthenticated, props.history]);

  return (
    <RootContainer className="shadow p-3 mb-5 bg-white rounded">
      <div>
        <p>
          <b>Places Remember</b> is a free app that lets you save memories of
          places on the map.
        </p>
        <p>It's simple and fun! Try it now! 👇</p>
      </div>
      <ButtonContainer>
        <FacebookLogin
          cssClass="btn btn-primary"
          appId="1057291988076073"
          autoLoad={true}
          fields="name,email,picture"
          callback={props.loginUser}
        />
      </ButtonContainer>
    </RootContainer>
  );
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, { loginUser })(Login);
