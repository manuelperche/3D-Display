import { CircularProgress } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "100%", width: "100%" }}>
      <CircularProgress color="success"/>
      </div>
  );
}

export default Loader;
