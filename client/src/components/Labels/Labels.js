import React from "react";
import "./Labels.css";
import Chip from "@material-ui/core/Chip";

const Labels = ({ labels }) => {
  return (
    <div className="labelsContainer">
      <div className="labels">
        {labels.map((label, i) => (
          <div className="label" key={i}>
            <Chip classes={{ root: "label" }} label={label} color="primary">
              {label}
            </Chip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labels;
