import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.78615 7.45566C0.969427 7.63889 1.21797 7.74181 1.47712 7.74181C1.73628 7.74181 1.98482 7.63889 2.1681 7.45566L7.0059 2.61786L11.8437 7.45566C12.028 7.63369 12.2749 7.7322 12.5312 7.72998C12.7874 7.72775 13.0325 7.62496 13.2137 7.44376C13.395 7.26255 13.4977 7.01743 13.5 6.76117C13.5022 6.50492 13.4037 6.25804 13.2257 6.07371L7.69688 0.544939C7.5136 0.361717 7.26505 0.258789 7.0059 0.258789C6.74675 0.258789 6.4982 0.361717 6.31493 0.544939L0.78615 6.07371C0.602928 6.25699 0.5 6.50554 0.5 6.76469C0.5 7.02384 0.602928 7.27239 0.78615 7.45566Z" fill="#3A3A3A"/>
</svg>
`;

const svgFlecheHaut = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default svgFlecheHaut;