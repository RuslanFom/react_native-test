import * as React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = color => `
<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.43301 5.5C4.24056 5.83333 3.75944 5.83333 3.56699 5.5L0.96891 0.999999C0.77646 0.666666 1.01702 0.25 1.40192 0.25L6.59808 0.25C6.98298 0.25 7.22354 0.666667 7.03109 1L4.43301 5.5Z" fill="#8F8F8F"/>
</svg>`;

export default ({color, style}) => (
  <SvgXml xml={xml(color, style)} style={style} />
);
