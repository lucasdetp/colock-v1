import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="30" height="27" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3057 7.96675C12.6527 7.44352 13.6101 6.13656 13.6101 4.60695C13.6101 2.61867 11.9915 1 10.0032 1C8.01492 1 6.3962 2.61867 6.3962 4.60695C6.3962 6.13656 7.35585 7.44352 8.70066 7.96675C6.00436 8.56346 3.98047 10.9681 3.98047 13.8425C3.98047 15.0315 4.94899 16 6.13794 16H13.8617C15.0507 16 16.0192 15.0315 16.0192 13.8425C16.0192 10.9703 13.9953 8.56346 11.299 7.96675H11.3057Z" stroke="#7790ED" stroke-miterlimit="10"/>
</svg>
`;

const SvgAccount = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgAccount;
