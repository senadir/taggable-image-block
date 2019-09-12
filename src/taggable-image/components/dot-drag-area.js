/**
 * External dependencies
 */
import { useDrop } from 'react-dnd';
/**
 * Internal dependencies
 */
import Dot from './dot';
import types from '../shared';

function DotDragArea( { dots, setDots, children } ) {
	const [ , dropRef ] = useDrop( {
		accept: types.DOT,
		drop( { id, x, y }, monitor ) {
			const delta = monitor.getDifferenceFromInitialOffset();
			const newX = Math.round( x + delta.x );
			const newY = Math.round( y + delta.y );
			moveDot( id, newX, newY );
			return undefined;
		},
	} );
	const moveDot = ( id, x, y ) => {
		setDots( { ...dots, [ id ]: { x, y } } );
	};

	return (
		<div ref={ dropRef } style={ { position: 'relative' } }>
			{ Object.entries( dots ).map( ( [ key, { x, y } ] ) => (
				<Dot key={ key } id={ key } x={ x } y={ y } />
			) ) }
			{ children }
		</div>
	);
}

export default DotDragArea;
