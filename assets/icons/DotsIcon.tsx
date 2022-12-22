import * as React from 'react';
import Svg, { SvgProps, G, Path, Circle } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg xmlns="http://www.w3.org/2000/svg" {...props}>
		<G data-name="20x20/three-dots--grey" transform="rotate(90 12 12)">
			<Path fill="none" d="M0 0h24v24H0z" />
			<Circle
				cx={1}
				cy={1}
				r={+props.width-10}
				transform="translate(5 11)"
				stroke="#000"
				strokeMiterlimit={10}
				strokeWidth={0.5}
			/>
			<Circle
				data-name="Oval"
				cx={1}
				cy={1}
				r={+props.width-10}
				transform="translate(11 11)"
				stroke="#000"
				strokeMiterlimit={10}
				strokeWidth={0.5}
			/>
			<Circle
				data-name="Oval"
				cx={1}
				cy={1}
				r={+props.width-10}
				transform="translate(17 11)"
				stroke="#000"
				strokeMiterlimit={10}
				strokeWidth={0.5}
			/>
		</G>
	</Svg>
);

export default SvgComponent;
