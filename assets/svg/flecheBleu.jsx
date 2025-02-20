import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.91" d="M3.28102 1.48382L9.43694 7.63974C10.1877 8.39049 10.1877 9.60758 9.43694 10.3583L3.28102 16.5142C2.07033 17.7249 0 16.8678 0 15.1549C0 11.0514 0 6.94792 0 2.8444C0 1.13151 2.07033 0.27442 3.28102 1.4851V1.48382Z" fill="#7790ED"/>
</svg>
`;

const SvgFlecheBleu = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgFlecheBleu;
