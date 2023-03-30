import React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface CustomRangeProps {
  values: number[];
  setValues: (values: number[]) => void;
  step?: number;
  min?: number;
  max?: number;
}

const CustomRange: React.FC<CustomRangeProps> = ({
  values,
  setValues,
  step = 1,
  min = 0,
  max = 100,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '8px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: values,
                  colors: ['rgba(255, 72, 0, 1)', '#ccc'],
                  min: min,
                  max: max,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              background: 'url(/images/range_control.svg) no-repeat center',
            }}
          ></div>
        )}
      />
    </div>
  );
};

export default CustomRange;
