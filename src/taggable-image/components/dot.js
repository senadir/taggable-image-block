/**
 * External dependencies
 */
import { useDrag } from 'react-dnd';
/**
 * Internal dependencies
 */
import { type } from '../shared';

export default function Dot( { id, x, y } ) {
	const [ { isDragging }, dragRef ] = useDrag( {
		item: { type, id, x, y },
		collect: ( monitor ) => {
			console.log( monitor );
			return { isDragging: monitor.isDragging() };
		},
	} );
	if ( isDragging ) {
		return <div ref={ dragRef } />;
	}
	return <div ref={ dragRef } id={ id } className="wp-block-taggable-image-dot" style={ { left: x, top: y } }></div>;
}

