import React from "react";
import "./CSHeading.css";

export default function CSHeading(props) {
  const { Heading, Tagline } = props;
  return (
    <div className="cs-heading-container">
      <h1>
        {Heading}
        {Tagline ? <span>{Tagline}</span> : null}
      </h1>
    </div>
  );
}
