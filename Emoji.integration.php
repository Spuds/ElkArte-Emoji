<?php

/**
 * @package Emoji for ElkArte
 * @author Spuds
 * @copyright (c) 2011-2014 Spuds
 * @license This Source Code is subject to the terms of the Mozilla Public License
 * version 1.1 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/1.1/.
 *
 * @version 1.0
 */

if (!defined('ELK'))
	die('No access...');

/**
 * integrate_preparse_code, called from Post.subs
 *
 * - Allows access to the preparse code function on each section of the message
 * after preparse has run on that section
 * - Parts will be 0 = outside, 1 = begin tag, 2 = inside, 3 = close tag
 *
 * @param string $message
 * @param bool $smileys
 * @param string $cache_id
 * @param mixed[] $parse_tags
 */
function ipp_emoji(&$message, &$smileys, &$cache_id, &$parse_tags)
{
	// If we are doing smileys, then we are doing emoji!
	if ($smileys && (empty($_REQUEST['sa']) || $_REQUEST['sa'] !== 'install2'))
		$message = Emoji::emojiNameToImage($message);
}

/**
 * integrate_editor_plugins called from Editor.subs.php
 *
 * - Used to load in additonal JS for the editor
 * - Add plugins to the editor
 * - Add initilization objects to the editor
 *
 * @param string $editor_id
 */
function iep_emoji($editor_id)
{
	global $context;

	// Need caret and atwho to be available
	if (empty($context['mentions_enabled']))
	{
		loadCSSFile('jquery.atwho.css');
		loadJavascriptFile(array('jquery.atwho.js', 'jquery.caret.min.js', 'Emoji.plugin.js'));
	}
	else
		loadJavascriptFile(array('Emoji.plugin.js'));

	// Add the emoji plugin to the editor
	$context['controls']['richedit'][$editor_id]['plugin_addons'][] = 'emoji';
	$context['controls']['richedit'][$editor_id]['plugin_options'][] = '
					emojiOptions: {
						editor_id: \'' . $editor_id . '\'
					}';
}