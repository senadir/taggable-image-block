/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icon from './icon';
import metadata from './block.json';
import transforms from './transforms';

const { name, category, attributes } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Taggable Image' ),
	description: __( 'Add an image and tag it with links or text' ),
	icon,
	category,
	supports: {
		align: true,
	},
	save,
	transforms,
	edit,
	attributes,
};
