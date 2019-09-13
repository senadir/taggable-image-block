/**
 * External dependencies
 */
import { last } from 'lodash';
import uuid from 'uuid/v1';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
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
import { compose } from '@wordpress/compose';
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
import { useRef, useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import icon from './icon';
import DotDragArea from './components/dot-drag-area';

function Edit( {
	attributes,
	setAttributes,
	className,
	noticeUI,
	noticeOperations,
	isSelected,
} ) {
	const {
		id,
		url,
		alt,
	} = attributes;
	const imageRef = useRef( null );
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

	const [ isAddingTags, setIsAddingTags ] = useState( false );
	useEffect( () => {
		if ( ! isSelected ) {
			setIsAddingTags( false );
		}
	}, [ isSelected ] );
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
				<Toolbar>
					<IconButton
						className={ classnames( [ 'components-toolbar__control', { 'is-active': isAddingTags } ] ) }
						label={ __( 'Add tags' ) }
						icon="tag"
						onClick={ ( ) => setIsAddingTags( ! isAddingTags ) }
					/>
				</Toolbar>
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
	/*const setDots = ( nextDots ) => {
		setAttributes( { dots: nextDots } );
	};*/
	const [ dots, setDots ] = useState( {} );
	const addTag = ( { target, clientX, clientY } ) => {
		if ( target === imageRef.current ) {
			const rect = target.getBoundingClientRect();
			const { x, y } = {
				x: ( clientX - rect.left ) + imageRef.current.offsetLeft,
				y: ( clientY - rect.top ) + imageRef.current.offsetTop,
			};
			setDots( { ...dots, [ uuid() ]: { x, y } } );
		}
	};
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
				<div className="wp-block-taggable-image-container">
					<DndProvider backend={ HTML5Backend }>
						<DotDragArea dots={ dots } setDots={ setDots }>
							<img
								className={ className }
								src={ url }
								alt={ defaultedAlt }
								onClick={ ( event ) => isAddingTags ? addTag( event ) : false }
								ref={ imageRef }
							/>
						</DotDragArea>
					</DndProvider>
				</div>
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
] )( Edit );
