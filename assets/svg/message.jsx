import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="30" height="27" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0902 1.13709C15.6919 0.988246 15.2433 0.950511 14.78 1.0742L4.10515 3.93369C2.17436 4.4515 1.91861 7.08667 3.71522 7.96506L7.5663 9.66105L16.0902 1.13709Z" stroke="#7790ED" stroke-miterlimit="10"/>
<path d="M14.5653 14.3967L17.4247 3.72187C17.5484 3.25857 17.5107 2.80994 17.3619 2.41162L8.83789 10.9356L10.5339 14.7867C11.4123 16.5833 14.0475 16.3275 14.5653 14.3967Z" stroke="#7790ED" stroke-miterlimit="10"/>
</svg>
`;

const SvgMessage = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgMessage;
