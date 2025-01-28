import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_752_5533)">
<path d="M11.5411 24.9649C11.8349 24.671 12 24.2725 12 23.8569C12 23.4413 11.8349 23.0427 11.5411 22.7488L3.78308 14.9908L11.5411 7.23273C11.8266 6.93714 11.9846 6.54124 11.981 6.13031C11.9774 5.71937 11.8126 5.32628 11.522 5.03569C11.2314 4.7451 10.8383 4.58028 10.4274 4.57671C10.0165 4.57313 9.62058 4.73111 9.32499 5.0166L0.458878 13.8827C0.165059 14.1766 0 14.5752 0 14.9908C0 15.4064 0.165059 15.8049 0.458878 16.0988L9.32499 24.9649C9.6189 25.2588 10.0175 25.4238 10.4331 25.4238C10.8486 25.4238 11.2472 25.2588 11.5411 24.9649Z" fill="#6D6D6D"/>
</g>
<defs>
<clipPath id="clip0_752_5533">
<rect width="12" height="30" fill="white" transform="matrix(-1 0 0 -1 12 30)"/>
</clipPath>
</defs>
</svg>
`;

const svgFlecheRetour = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default svgFlecheRetour;
