import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.91" d="M12.3348 14.2523L8.54358 9.41292C8.26871 9.06277 7.72815 9.06277 7.45329 9.41292L3.66202 14.2523C2.79528 15.6026 0.666016 15.0011 0.666016 13.4065V3.13345C0.666016 1.40242 2.09713 0 3.86358 0H12.1351C13.9016 0 15.3327 1.40242 15.3327 3.13345V13.4065C15.3327 15.0029 13.2034 15.6044 12.3367 14.2523H12.3348Z" fill="white"/>
</svg>
`;

const SvgSaveFull= () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgSaveFull;
