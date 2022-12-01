import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg
		width={24}
		height={24}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<Path
			d="M20 20 4 4m16 0L4 20"
			stroke="#000"
			strokeWidth={2}
			strokeLinecap="round"
		/>
	</Svg>
);

export default SvgComponent;