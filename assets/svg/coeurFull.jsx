import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.91" d="M19.3732 5.07822C19.3732 6.24982 18.9248 7.42142 18.0224 8.31616L11.3537 14.9424C10.6064 15.685 9.39222 15.6868 8.6449 14.9424L1.97434 8.31616C0.175221 6.52668 0.175221 3.62977 1.97434 1.84211C2.87297 0.945538 4.05393 0.5 5.23304 0.5C6.41215 0.5 7.59311 0.945538 8.49174 1.84211L10.0012 3.33824L11.4257 1.92279C13.2322 0.127802 16.1901 0.0397944 18.0058 1.82378C18.9192 2.72035 19.375 3.89745 19.375 5.08005L19.3732 5.07822Z" fill="#7790ED"/>
</svg>
`;

const SvgCoeurFull = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgCoeurFull;
