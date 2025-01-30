import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="30" height="25" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3009 6.96738C12.6469 6.44302 13.6068 5.13625 13.6068 3.60652C13.6068 1.6185 11.9883 0 10.0003 0C8.01227 0 6.39375 1.6185 6.39375 3.60652C6.39375 5.13625 7.35165 6.44302 8.69971 6.96738C6.00359 7.564 3.98047 9.96903 3.98047 12.8427C3.98047 14.0318 4.94867 15 6.13777 15H13.8628C15.0519 15 16.0201 14.0318 16.0201 12.8427C16.0201 9.96903 13.997 7.564 11.3009 6.96738Z" fill="#7790ED"/>
</svg>
`;

const SvgAccountFull = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgAccountFull;
