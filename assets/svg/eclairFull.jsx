import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6657 6.4142L5.12399 14.4944C4.90545 14.7643 4.61385 14.938 4.29835 14.9863C3.98284 15.0346 3.66271 14.9545 3.39191 14.7595C3.12112 14.5645 2.91621 14.2666 2.81172 13.916C2.70723 13.5653 2.70955 13.1833 2.81828 12.8344L3.85714 9.50029H1.43743C1.20252 9.50029 0.971179 9.43312 0.763665 9.30465C0.556152 9.17619 0.378789 8.99034 0.247098 8.76337C0.115406 8.53641 0.0334007 8.27524 0.00825729 8.00274C-0.0168861 7.73023 0.0155992 7.45469 0.10287 7.20022L2.094 1.39304C2.23535 0.982215 2.47874 0.63007 2.79292 0.381843C3.10709 0.133615 3.4777 0.000640573 3.85714 0H7.28569C8.1154 0 8.68882 0.96703 8.39825 1.87306L7.71426 4.00012H10.7734C11.013 4.00011 11.2474 4.08201 11.4477 4.23571C11.6479 4.38941 11.8051 4.60816 11.8999 4.86496C11.9947 5.12175 12.023 5.40533 11.9812 5.68065C11.9394 5.95598 11.8303 6.211 11.6657 6.4142Z" fill="white"/>
</svg>
`;

const SvgEclairFull= () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgEclairFull;
