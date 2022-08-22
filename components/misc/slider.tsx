import { Range } from 'react-range';
import React, { useState} from 'react';




/*  
 * @brief to use this component you must add a 
 * useState in the parent, then pass it into the
 * component
 *
 * 
*/


export function Slider ({sliderVal, setSliderVal}: any){


	return (
        <div>
            <h3>set milliseconds </h3>
            <Range
                step={1}
                min={1}
                max={1000}
                values={sliderVal.values}
                onChange={(values) => setSliderVal({values})}
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc',
                    marginBottom: '20px'
                    }}
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '42px',
                    width: '42px',
                    backgroundColor: '#999'
                    }}
                />
                )}
            />
        </div>
	);
}

