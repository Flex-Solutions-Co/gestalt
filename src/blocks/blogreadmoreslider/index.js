import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import carousel from './blogreadmore.jpg';
// import blockIcon from './icon';

registerBlockType( metadata.name, {
	example: {
		attributes: {
			cover: carousel,
		},
		viewportWidth: 1728,
	},
	// icon: blockIcon,
	edit: Edit,
	save: () => { return null;},
} );
