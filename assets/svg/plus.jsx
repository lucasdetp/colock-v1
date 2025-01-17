import React from 'react';
import Svg, { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.91" d="M15.1283 0.829102H5.87361C4.29284 0.829102 3 2.12194 3 3.70078V12.9555C3 14.5363 4.29284 15.8291 5.87361 15.8291H15.1283C16.7091 15.8291 18 14.5363 18 12.9555V3.70078C18 2.12001 16.7072 0.829102 15.1283 0.829102ZM15.3834 9.22191H11.4972V13.1082C11.4972 13.6589 11.0508 14.1053 10.5 14.1053C9.94924 14.1053 9.50283 13.6589 9.50283 13.1082V9.22191H5.61659C5.06583 9.22191 4.61943 8.77551 4.61943 8.22475C4.61943 7.67399 5.06583 7.22758 5.61659 7.22758H9.50283V3.34134C9.50283 2.79058 9.94924 2.34417 10.5 2.34417C11.0508 2.34417 11.4972 2.79058 11.4972 3.34134V7.22758H15.3834C15.9342 7.22758 16.3806 7.67399 16.3806 8.22475C16.3806 8.77551 15.9342 9.22191 15.3834 9.22191Z" fill="#7790ED"/>
</svg>
`;

const SvgPlus= () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgPlus;
