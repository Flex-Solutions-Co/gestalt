/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import json from "./block.json";
import Edit from "./edit";
import save from "./save";
import testimonialSlider from './testimonial-slider.jpg';

// Destructure the json file to get the name of the block
// For more information on how this works, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { name } = json;

// Register the block
registerBlockType(name, {
    example: {
		attributes: {
			cover: testimonialSlider,
		},
		viewportWidth: 1728,
	},
    edit: Edit,
    save,
});
