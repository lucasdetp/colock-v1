import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.91" d="M9.32726 8.80397L9.32668 8.80321C8.65703 7.93267 7.34265 7.93267 6.673 8.80321L6.67243 8.80397L2.95718 13.6433L2.92875 13.6803L2.9039 13.7198C2.58825 14.2217 1.81445 13.9971 1.81445 13.4065V3.13345C1.81445 1.95471 2.76916 1 3.9479 1H12.0536C13.2323 1 14.187 1.95471 14.187 3.13345V13.4065C14.187 14 13.4131 14.2222 13.0979 13.7203L12.8039 13.2523H12.7423L9.32726 8.80397Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
</svg>
`;

const SvgSave= () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgSave;
