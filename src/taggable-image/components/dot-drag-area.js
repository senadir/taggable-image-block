/**
 * External dependencies
 */
import { useDrop } from 'react-dnd';
/**
 * Internal dependencies
 */
import Dot from './dot';
import { type } from '../shared';

function DotDragArea( { dots, setDots } ) {
	const [ , dropRef ] = useDrop( {
		accept: type,
		drop( { id, prevX, prevY }, monitor ) {
			const delta = monitor.getDifferenceFromInitialOffset();
			const x = Math.round( prevX + delta.x );
			const y = Math.round( prevY + delta.y );
			console.log( x, y );
			setDots( { dots: { ...dots, [ id ]: { x, y } } } );
		},
	} );

	return (
		<div ref={ dropRef }>
			{ Object.entries( dots ).map( ( [ key, { x, y } ] ) =>
				<Dot key={ key } id={ key } x={ x } y={ y } />
			) }
		</div>
	);
}

export default DotDragArea;
