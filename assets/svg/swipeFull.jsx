import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="30" height="25" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.1594 13.3226L14.1776 10.3408C14.9921 9.25903 15.4746 7.91565 15.4746 6.46093C15.4746 2.89833 12.5763 0 9.01366 0C5.45107 0 2.55273 2.89833 2.55273 6.46093C2.55273 10.0235 5.45107 12.9218 9.01366 12.9218C10.4146 12.9218 11.7097 12.4728 12.7692 11.712L15.7696 14.7124C15.9607 14.9035 16.2131 15 16.4635 15C16.714 15 16.9664 14.9035 17.1575 14.7124C17.5416 14.3283 17.5416 13.7067 17.1575 13.3226H17.1594Z" fill="#7790ED"/>
</svg>
`;

const SvgSwipeFull = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgSwipeFull;
