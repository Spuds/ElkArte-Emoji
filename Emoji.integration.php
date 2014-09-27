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
 * @param string $part
 * @param int $i
 * @param boolean $previewing
 */
function ipp_emoji(&$message, &$smileys, &$cache_id, &$parse_tags)
{
	global $modSettings;

	if ($smileys)
		$message = Emoji::shortnameToImage($message);
}

/**
 * integrate_bbc_buttons
 */
function ibb_emoji()
{
	global $context;
			
	// Need caret and atwho to be available
	if (empty($context['mentions_enabled']))
		loadJavascriptFile(array('jquery.atwho.js', 'jquery.caret.min.js', 'Emoji.plugin.js'));
	else
		loadJavascriptFile(array('Emoji.plugin.js'));
}