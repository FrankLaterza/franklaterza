import {Range} from "react-range";
import React, {useState} from "react";

/*
 * @brief to use this component you must add a
 * useState in the parent, then pass it into the
 * component
 *
 *
 */
export function Slider({sliderVal, setSliderVal, step, min, max}: any) {
  return (
    <div>
      <Range
        step={step}
        min={min}
        max={max}
        values={sliderVal.values}
        onChange={(values) => setSliderVal({values})}
        renderTrack={({props, children}) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              backgroundColor: "#ccc",
              marginBottom: "20px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({props}) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#999",
              borderRadius: "5px",
            }}
          />
        )}
      />
    </div>
  );
}
