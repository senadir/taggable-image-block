<?php

class Taggable_Image_Block_Plugin {
	/**
	 * Registers the initial hooks to get the plugin going, if you're
	 */
	public function add_actions() {
		add_action( 'init', array( $this, 'wp_enqueue_scripts' ) );
	}

	public function wp_enqueue_scripts() {
		if ( ! function_exists( 'register_block_type' ) ) {
			// Gutenberg is not active.
			return;
		}

		$script_deps_path = plugin_dir_path( __FILE__ ) . 'build/index.deps.json';
		$script_dependencies = file_exists( $script_deps_path )
			? json_decode( file_get_contents( $script_deps_path ) )
			: array();
		wp_register_script(
			'taggable-image-block',
			plugins_url( 'build/index.js', __FILE__ ),
			$script_dependencies,
			filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
		);
		wp_register_style(
			'taggable-image-block',
			plugins_url( 'build/style.blocks.css', __FILE__ ),
			array( ),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/style.blocks.css' )
		);
		wp_register_style(
			'taggable-image-block-editor',
			plugins_url( 'build/editor.blocks.css', __FILE__ ),
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.blocks.css' )
		);
		register_block_type( 'taggable/image', array(
			'style' => 'taggable-image-block',
			'editor_style' => 'taggable-image-block-editor',
			'editor_script' => 'taggable-image-block',
		) );
	}
}

