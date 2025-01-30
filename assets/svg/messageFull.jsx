import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="30" height="25" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0884 0.137252C15.6901 -0.0120873 15.2401 -0.0499202 14.7782 0.0755248L4.10339 2.93687C2.17193 3.45458 1.91707 6.09091 3.71312 6.96903L7.56408 8.66553L16.0884 0.141235V0.137252Z" fill="#7790ED"/>
<path d="M14.5645 13.3966L17.4259 2.72183C17.5493 2.25987 17.5115 1.80986 17.3641 1.41162L8.83984 9.93591L10.5363 13.7869C11.4145 15.5829 14.0508 15.3281 14.5685 13.3966H14.5645Z" fill="#7790ED"/>
</svg>
`;

const SvgMessageFull = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgMessageFull;
