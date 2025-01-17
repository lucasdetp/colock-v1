import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2496 14.2532L8.53414 9.41404C8.26493 9.06289 7.73487 9.06289 7.46566 9.41404L3.75021 14.2532C2.90077 15.6042 0.813965 15.0023 0.813965 13.4071V3.13355C0.813965 1.40291 2.21687 0 3.94752 0H12.0523C13.7829 0 15.1858 1.40291 15.1858 3.13355V13.4071C15.1858 15.0023 13.099 15.6042 12.2496 14.2532Z" fill="white"/>
</svg>
`;

const SvgSave= () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default SvgSave;
