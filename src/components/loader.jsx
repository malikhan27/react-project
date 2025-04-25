import { useState, CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loader(){



  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#1f0437");

  return (
    <span className="sweet-loading">
     

      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </span>
  );



}