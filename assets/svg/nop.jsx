import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.91" d="M25 20.3368L20.3368 25L12.4985 17.1617L4.66321 25L0 20.3368L7.83829 12.4985L0 4.66321L4.66321 0L12.4985 7.83829L20.3368 0L25 4.66321L17.1617 12.4985L25 20.3368Z" fill="#FFFFFF"/>
</svg>

`;

const SvgNop = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgNop;
