import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="15" height="33" viewBox="0 0 15 33" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.75868 12.5999L11.0065 0L0 17.1656L6.00062 16.845L1.24931 33L15 11.9415L7.75868 12.5999Z" fill="url(#paint0_linear_131_5007)"/>
  <defs>
    <linearGradient id="paint0_linear_131_5007" x1="2.68221" y1="32.179" x2="11.3805" y2="0.872698" gradientUnits="userSpaceOnUse">
      <stop stop-color="#AB9EFF"/>
      <stop offset="0.99" stop-color="#9900FF"/>
    </linearGradient>
  </defs>
</svg>
`;

const SvgEclair = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgEclair;
