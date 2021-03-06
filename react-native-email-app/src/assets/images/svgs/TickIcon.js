import * as React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = color => `
<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 4.5L4.07895 8L10 1" stroke="#8F8F8F" stroke-width="2" stroke-linecap="round"/>
</svg>
`;
export default ({color, style}) => (
  <SvgXml xml={xml(color, style)} style={style} />
);
