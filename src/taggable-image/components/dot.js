/**
 * External dependencies
 */
import Draggable from 'react-draggable';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';

function Dot( { id, x, y, onDragStart, onDragStop } ) {
	return (
		<Draggable
			onStart={ onDragStart }
			onStop={ ( _, { x: newX, y: newY } ) => onDragStop( id, newX, newY ) }
			defaultPosition={ { x, y } }
			bounds="parent"
		>
			<div
				id={ id }
				className={
					classnames( [
						'wp-block-taggable-image-dot',
					] ) }
				style={ { transform: `translateX(${ x }px) translateY(${ y }px)` } }
			/>
		</Draggable>
	);
}

export default memo( Dot );
