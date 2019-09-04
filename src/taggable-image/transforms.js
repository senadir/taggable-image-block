/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from:
		[ {
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { caption, url, align } ) => (
				createBlock( 'taggable-image', {
					caption,
					url,
					align,
				} )
			),
		} ],

	to:
		[ {
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { caption, url, align } ) => (
				createBlock( 'core/image', {
					caption,
					url,
					align,
				} )
			),
		} ],

};

export default transforms;
