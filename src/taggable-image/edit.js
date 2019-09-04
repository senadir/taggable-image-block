/**
 * External dependencies
 */
import { last } from 'lodash';
/**
 * WordPress dependencies
 */
import {
	IconButton,
	Toolbar,
	withNotices,
	Spinner,
	ExternalLink,
	PanelBody,
	TextareaControl,
} from '@wordpress/components';
import {
	compose,
	withInstanceId,
} from '@wordpress/compose';
import {
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockIcon,
	InspectorControls,
} from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { getPath } from '@wordpress/url';
import { isBlobURL } from '@wordpress/blob';
/**
 * Internal dependencies
 */
import icon from './icon';

function edit( {
	attributes,
	setAttributes,
	className,
	noticeUI,
	noticeOperations,
} ) {
	const {
		id,
		url,
		alt,
	} = attributes;
	const onSelectMedia = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { url: undefined, id: undefined } );
			return;
		}
		setAttributes( {
			url: media.url,
			id: media.id,
		} );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const placeholderIcon = <BlockIcon icon={ icon } />;
	const control = ( <>
		<BlockControls>
			<>
				<MediaUploadCheck>
					<Toolbar>
						<MediaUpload
							onSelect={ onSelectMedia }
							allowedTypes="image"
							value={ id }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit media' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				</MediaUploadCheck>
			</>
		</BlockControls>
		{ ! url && (
			<MediaPlaceholder
				icon={ placeholderIcon }
				className={ className }
				labels={ {
					title: __( 'Taggable Image' ),
					instructions: __( 'Upload an image, or pick one from your media library, then tag it' ),
				} }
				onSelect={ onSelectMedia }
				accept="image/*,video/*"
				allowedTypes="image"
				notices={ noticeUI }
				onError={ onUploadError }
			/>
		) }
	</> );
	const sidebar = (
		<InspectorControls>
			<PanelBody title={ __( 'Image Settings' ) }>
				<TextareaControl
					label={ __( 'Alt Text (Alternative Text)' ) }
					value={ alt }
					onChange={ ( newAlt ) => setAttributes( { alt: newAlt } ) }
					help={
						<>
							<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
								{ __( 'Describe the purpose of the image' ) }
							</ExternalLink>
							{ __( 'Leave empty if the image is purely decorative.' ) }
						</>
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
	const getFilename = ( imageUrl ) => {
		const path = getPath( imageUrl );
		if ( path ) {
			return last( path.split( '/' ) );
		}
	};
	const filename = getFilename( url );
	let defaultedAlt;
	if ( alt ) {
		defaultedAlt = alt;
	} else if ( filename ) {
		defaultedAlt = sprintf( __( 'This image has an empty alt attribute; its file name is %s' ), filename );
	} else {
		defaultedAlt = __( 'This image has an empty alt attribute' );
	}

	return (
		<>
			{ control }
			{ sidebar }
			{
				// Disable reason: Image itself is not meant to be interactive, but
				// should direct focus to block.
				/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
			}
			{ url && (
				<img
					className={ className }
					src={ url }
					alt={ defaultedAlt }
				/>
			) }
			{ isBlobURL( url ) && <Spinner /> }
			{
				/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
			}
		</>
	);
}

export default compose( [
	withNotices,
	withInstanceId,
] )( edit );
