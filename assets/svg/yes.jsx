import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="34" height="27" viewBox="0 0 34 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_121_8238)">
<path d="M33.9998 8.24251C33.9998 10.3494 33.1868 12.4595 31.5508 14.0697L19.4571 25.9969C18.1009 27.3344 15.8988 27.3344 14.5426 25.9969L2.44558 14.0697C-0.816496 10.8493 -0.816496 5.63244 2.44558 2.41529C4.07497 0.801852 6.21787 0 8.35748 0C10.4971 0 12.6367 0.801852 14.2661 2.41529L17.0015 5.10978L19.5855 2.56138C22.8607 -0.668751 28.2262 -0.831069 31.5179 2.38283C33.1736 3.99952 33.9998 6.11615 33.9998 8.24251Z" fill="#A700FF"/>
</g>
<defs>
<clipPath id="clip0_121_8238">
<rect width="34" height="27" fill="white"/>
</clipPath>
</defs>
</svg>

`;

const SvgYes= () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgYes;
