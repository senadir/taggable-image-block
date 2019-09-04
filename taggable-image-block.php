<?php
/*
 * Plugin Name: Taggable Image Block
 * Plugin URI: https://github.com/senadir/taggable-image-block
 * Description: Tag images with text
 * Version: 0.1
 * Author: Nadir Seghir
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/taggable-image-block-plugin.php';

( new Taggable_Image_Block_Plugin() )->add_actions();
