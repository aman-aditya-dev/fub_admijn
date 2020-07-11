import React from "react";
import { css } from "@emotion/core";
import "./spinner.scss";
import ScaleLoader from "react-spinners/ScaleLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-div">
      <ScaleLoader css={override} size={100} color={"#ff6600"} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
