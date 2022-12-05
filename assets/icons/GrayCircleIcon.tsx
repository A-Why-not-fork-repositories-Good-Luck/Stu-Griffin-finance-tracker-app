import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		xmlSpace="preserve"
		{...props}
	>
		<Circle cx={256} cy={256} r={256} />
	</Svg>
);

export default SvgComponent;