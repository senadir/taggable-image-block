import { registerBlockType } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import * as taggableImage from './taggable-image';

const { settings, name } = taggableImage;
registerBlockType( name, settings );
