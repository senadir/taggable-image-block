/**
 * External dependencies
 */
import { useDrag } from 'react-dnd';
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import types from '../shared';

export default function Dot( { id, x, y } ) {
	const [ { isDragging }, dragRef ] = useDrag( {
		item: { id, x, y, type: types.DOT },
		collect: ( monitor ) => {
			return { isDragging: monitor.isDragging() };
		},
	} );
	if ( isDragging ) {
		return <div ref={ dragRef } />;
	}
	return (
		<div
			ref={ dragRef }
			id={ id }
			className={
				classnames( [
					'wp-block-taggable-image-dot',
					{ 'is-dargging': isDragging },
				] ) }
			style={ { left: x, top: y } }
		/>
	);
}
