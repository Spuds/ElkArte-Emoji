<?php

/**
 * @package Emoji for ElkArte
 * @author Spuds
 * @copyright (c) 2011-2014 Spuds
 * @license This Source Code is subject to the terms of the Mozilla Public License
 * version 1.1 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/1.1/.
 *
 * @version 1.0.1
 */

if (!defined('ELK'))
{
	die('No access...');
}

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
	if ($smileys && (empty($_REQUEST['sa']) || $_REQUEST['sa'] !== 'install2') && $message !== false)
	{
		$message = Emoji::emojiNameToImage($message);
	}
}

/**
 * integrate_editor_plugins called from Editor.subs.php
 *
 * - Used to load in additional JS for the editor
 * - Add plugins to the editor
 * - Add initialization objects to the editor
 *
 * @param string $editor_id
 */
function iep_emoji($editor_id)
{
	global $context, $modSettings;

	// Need caret and atwho to be available
	if (empty($context['mentions_enabled']))
	{
		loadCSSFile('jquery.atwho.css');
		loadJavascriptFile(array('jquery.atwho.js', 'jquery.caret.min.js', 'Emoji.plugin.js'));
	}
	else
	{
		loadJavascriptFile(array('Emoji.plugin.js'));
	}

	// Add the emoji plugin to the editor
	$context['controls']['richedit'][$editor_id]['plugin_addons'][] = 'emoji';
	$context['controls']['richedit'][$editor_id]['plugin_options'][] = '
					emojiOptions: {
						editor_id: \'' . $editor_id . '\',
						emoji_group: \'' . $modSettings['emoji_selection'] . '\'
					}';
}

/**
 * iaa_emoji()
 *
 * - Admin Hook, integrate_admin_areas, called from Admin.php
 * - Used to add/modify admin menu areas
 *
 * @param mixed[] $admin_areas
 */
function iaa_emoji(&$admin_areas)
{
	global $txt;

	loadlanguage('emoji');
	$admin_areas['config']['areas']['addonsettings']['subsections']['emoji'] = array($txt['emoji_title']);
}

/**
 * imm_emoji()
 *
 * - Admin Hook, integrate_sa_modify_modifications, called from AddonSettings.controller.php
 * - Used to add subactions to the addon area
 *
 * @param mixed[] $sub_actions
 */
function imm_emoji(&$sub_actions)
{
	$sub_actions['emoji'] = array(
		'dir' => SUBSDIR,
		'file' => 'Emoji.integration.php',
		'function' => 'emoji_settings',
		'permission' => 'admin_forum',
	);
}

/**
 * emoji_settings()
 *
 * - Defines our settings array and uses our settings class to manage the data
 */
function emoji_settings()
{
	global $txt, $context, $scripturl;

	loadlanguage('emoji');
	$context[$context['admin_menu_name']]['tab_data']['tabs']['emoji']['description'] = $txt['emoji_desc'];

	// Lets build a settings form
	require_once(SUBSDIR . '/SettingsForm.class.php');

	// Instantiate the form
	$emojiSettings = new Settings_Form();

	// All the options, well at least some of them!
	$config_vars = array(
		array('select', 'emoji_selection', array(
			'openemoji' => $txt['emoji_open'],
			'twitter' => $txt['emoji_twitter'],
		))
	);

	// Load the settings to the form class
	$emojiSettings->settings($config_vars);

	// Saving?
	if (isset($_GET['save']))
	{
		checkSession();

		if (empty($_POST['emoji_selection']))
		{
			$_POST['emoji_selection'] = 'openemoji';
		}

		Settings_Form::save_db($config_vars);
		redirectexit('action=admin;area=addonsettings;sa=emoji');
	}

	// Continue on to the settings template
	$context['settings_title'] = $txt['emoji_title'];
	$context['page_title'] = $context['settings_title'] = $txt['emoji_settings'];
	$context['post_url'] = $scripturl . '?action=admin;area=addonsettings;sa=emoji;save';

	Settings_Form::prepare_db($config_vars);
}
