import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgXml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="35" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="c327ddc4ee"><path d="M 37.5 37.5 L 337.5 37.5 L 337.5 337.5 L 37.5 337.5 Z M 37.5 37.5 " clip-rule="nonzero"/></clipPath><clipPath id="3a779bc26a"><path d="M 187.5 37.5 C 104.65625 37.5 37.5 104.65625 37.5 187.5 C 37.5 270.34375 104.65625 337.5 187.5 337.5 C 270.34375 337.5 337.5 270.34375 337.5 187.5 C 337.5 104.65625 270.34375 37.5 187.5 37.5 Z M 187.5 37.5 " clip-rule="nonzero"/></clipPath><clipPath id="5b24b3a07a"><path d="M 117.484375 129 L 246 129 L 246 257.734375 L 117.484375 257.734375 Z M 117.484375 129 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#c327ddc4ee)"><g clip-path="url(#3a779bc26a)"><path fill="#7790ed" d="M 37.5 37.5 L 337.5 37.5 L 337.5 337.5 L 37.5 337.5 Z M 37.5 37.5 " fill-opacity="1" fill-rule="nonzero"/></g></g><g clip-path="url(#5b24b3a07a)"><path fill="#ffffff" d="M 235.066406 246.824219 L 128.175781 246.824219 L 128.175781 139.933594 L 192.308594 139.933594 L 192.308594 129.242188 L 128.175781 129.242188 C 122.273438 129.242188 117.484375 134.03125 117.484375 139.933594 L 117.484375 246.824219 C 117.484375 252.722656 122.273438 257.511719 128.175781 257.511719 L 235.066406 257.511719 C 240.964844 257.511719 245.753906 252.722656 245.753906 246.824219 L 245.753906 182.6875 L 235.066406 182.6875 Z M 235.066406 246.824219 " fill-opacity="1" fill-rule="nonzero"/></g><path fill="#ffffff" d="M 160.242188 214.925781 L 182.742188 214.925781 L 237.277344 160.390625 L 214.605469 137.71875 L 160.242188 192.085938 Z M 160.242188 214.925781 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffffff" d="M 253.3125 129.242188 L 245.753906 121.6875 C 241.574219 117.507812 234.808594 117.507812 230.640625 121.6875 L 222.164062 130.164062 L 244.835938 152.832031 L 253.3125 144.355469 C 257.492188 140.179688 257.492188 133.410156 253.3125 129.242188 Z M 253.3125 129.242188 " fill-opacity="1" fill-rule="nonzero"/></svg>

`;

const svgEdit = () => {
  return (
    <SvgXml xml={svgXml} />
  );
};

export default svgEdit;
