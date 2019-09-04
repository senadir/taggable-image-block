export default function save( { attributes } ) {
	const { url, alt, id } = attributes;
	const image = (
		<img
			src={ url }
			alt={ alt }
			className={ id ? `wp-image-${ id }` : null }
		/>
	);

	return (
		<figure>
			{ image }
		</figure>
	);
}
