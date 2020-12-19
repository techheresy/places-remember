import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import styled from "styled-components";

import { loginUser } from "../redux/login/loginActions";
import { getPlaces } from "../redux/places/placesActions";

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

function Login({ login: { isAuthenticated }, loginUser, getPlaces, history }) {
  useEffect(() => {
    if (isAuthenticated) {
      getPlaces();
      history.push("/places");
    }
  }, [isAuthenticated, history]);

  if (!process.env.REACT_APP_FACEBOOK_ID) {
    return (
      <div className="m-5 p-5">
        <h1>
          env <strong>'REACT_APP_FACEBOOK_ID'</strong> is not set
        </h1>
        <img
          src="https://lh3.googleusercontent.com/proxy/PvdCv3PwKucNXE4hA_ZaqfosHzQdjZ9hMi69D-eiyuzNiVlpLM8i2pMrP_Q9vX6rd236u8CYs1xXd-eVKVDGmLaHFABxnP5tV4tek19EA-mfbA293dlzWP8rWx0HBkMc7dGn8DXglJy8BcytVAENb3WZIZ7No2-9uhtGklcP3ij014SNP5lZjul5MmbyLbCRpm8"
          alt="techpriest-repair"
        />
      </div>
    );
  }

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
          appId={process.env.REACT_APP_FACEBOOK_ID}
          autoLoad={true}
          fields="name,email,picture"
          callback={loginUser}
        />
      </ButtonContainer>
    </RootContainer>
  );
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, { loginUser, getPlaces })(Login);
