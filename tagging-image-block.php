<?php
/*
 * Plugin Name: Taggable Image Block
 * Plugin URI: https://github.com/senadir/tagging-image-block
 * Description: Tag images with text
 * Version: 0.1
 * Author: Nadir Seghir
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/tagging-image-block-plugin.php';

( new Tagging_Images_Block_Plugin() )->add_actions();
