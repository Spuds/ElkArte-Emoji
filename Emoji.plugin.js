/**
 * @package Emoji for ElkArte
 * @author Spuds
 * @copyright (c) 2011-2014 Spuds
 * @license This Source Code is subject to the terms of the Mozilla Public License
 * version 1.1 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/1.1/.
 *
 * This handles the population of the emoji selection drop down and the rendering of
 * emoji when toggling from source to wizzy
 *
 * @version 1.0
 *
 */

var disableDrafts = false;

(function($, window, document) {
	'use strict';

	// These are all we know, but we can only remember about 6 of them
	var emojies = [
		'+1', '-1', '100', '1234', '8ball', 'a', 'ab', 'abc', 'abcd', 'accept', 'aerial_tramway', 'airplane', 'alarm_clock', 'alien', 'ambulance', 'anchor',
		'angel', 'anger', 'angry', 'anguished', 'ant', 'apple', 'aquarius', 'aries', 'arrow_backward', 'arrow_double_down', 'arrow_double_up', 'arrow_down',
		'arrow_down_small', 'arrow_forward', 'arrow_heading_down', 'arrow_heading_up', 'arrow_left', 'arrow_lower_left', 'arrow_lower_right',
		'arrow_right', 'arrow_right_hook', 'arrow_up', 'arrow_up_down', 'arrow_up_small', 'arrow_upper_left', 'arrow_upper_right',
		'arrows_clockwise', 'arrows_counterclockwise', 'art', 'articulated_lorry', 'astonished', 'athletic_shoe', 'atm', 'b', 'baby', 'baby_bottle',
		'baby_chick', 'baby_symbol', 'back', 'baggage_claim', 'balloon', 'ballot_box_with_check', 'bamboo', 'banana', 'bangbang', 'bank', 'bar_chart',
		'barber', 'baseball', 'basketball', 'bath', 'bathtub', 'battery', 'bear', 'bee', 'beer', 'beers', 'beetle', 'beginner', 'bell', 'bento', 'bicyclist',
		'bike', 'bikini', 'bird', 'birthday', 'black_circle', 'black_joker', 'black_large_square', 'black_medium_small_square', 'black_medium_square',
		'black_nib', 'black_small_square', 'black_square_button', 'blossom', 'blowfish', 'blue_book', 'blue_car', 'blue_heart', 'blush', 'boar',
		'bomb', 'book', 'bookmark', 'bookmark_tabs', 'books', 'boom', 'boot', 'bouquet', 'bow', 'bowling', 'boy', 'bread', 'bride_with_veil',
		'bridge_at_night', 'briefcase', 'broken_heart', 'bug', 'bulb', 'bullettrain_front', 'bullettrain_side', 'bus', 'busstop',
		'bust_in_silhouette', 'busts_in_silhouette', 'cactus', 'cake', 'calendar', 'calling', 'camel', 'camera', 'cancer', 'candy', 'capital_abcd', 'capricorn',
		'card_index', 'carousel_horse', 'cat', 'cat2', 'cd', 'chart', 'chart_with_downwards_trend', 'chart_with_upwards_trend', 'checkered_flag',
		'cherries', 'cherry_blossom', 'chestnut', 'chicken', 'children_crossing', 'chocolate_bar', 'christmas_tree', 'church', 'cinema', 'circus_tent',
		'city_sunset', 'cl', 'clap', 'clapper', 'clipboard', 'clock1', 'clock10', 'clock1030', 'clock11', 'clock1130', 'clock12',
		'clock1230', 'clock130', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4', 'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7',
		'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'closed_book', 'closed_lock_with_key', 'closed_umbrella', 'cloud', 'clubs', 'cn',
		'cocktail', 'coffee', 'cold_sweat', 'computer', 'confetti_ball', 'confounded', 'confused', 'congratulations', 'construction',
		'construction_worker', 'convenience_store', 'cookie', 'cool', 'cop', 'copyright', 'corn', 'couple', 'couple_with_heart', 'couplekiss', 'cow',
		'cow2', 'credit_card', 'crescent_moon', 'crocodile', 'crossed_flags', 'crown', 'cry', 'crying_cat_face', 'crystal_ball', 'cupid', 'curly_loop',
		'currency_exchange', 'curry', 'custard', 'customs', 'cyclone', 'dancer', 'dancers', 'dango', 'dart', 'dash', 'date', 'de', 'deciduous_tree',
		'department_store', 'diamond_shape_with_a_dot_inside', 'diamonds', 'disappointed', 'disappointed_relieved', 'dizzy', 'dizzy_face',
		'do_not_litter', 'dog', 'dog2', 'dollar', 'dolls', 'dolphin', 'door', 'doughnut', 'dragon', 'dragon_face', 'dress', 'dromedary_camel', 'droplet',
		'dvd', 'e-mail', 'ear', 'ear_of_rice', 'earth_africa', 'earth_americas', 'earth_asia', 'egg', 'eggplant', 'eight', 'eight_pointed_black_star',
		'eight_spoked_asterisk', 'electric_plug', 'elephant', 'elk', 'email', 'end', 'envelope', 'envelope_with_arrow', 'es', 'euro', 'european_castle',
		'european_post_office', 'evergreen_tree', 'exclamation', 'expressionless', 'eyeglasses', 'eyes', 'factory', 'fallen_leaf', 'family',
		'fast_forward', 'fax', 'fearful', 'feet', 'ferris_wheel', 'file_folder', 'fire', 'fire_engine', 'fireworks',
		'first_quarter_moon', 'first_quarter_moon_with_face', 'fish', 'fish_cake', 'fishing_pole_and_fish', 'fist', 'five', 'flags', 'flashlight',
		'floppy_disk', 'flower_playing_cards', 'flushed', 'foggy', 'football', 'footprints', 'fork_and_knife', 'fountain', 'four', 'four_leaf_clover', 'fr',
		'free', 'fried_shrimp', 'fries', 'frog', 'frowning', 'fuelpump', 'full_moon', 'full_moon_with_face', 'game_die', 'gb', 'gem', 'gemini',
		'ghost', 'gift', 'gift_heart', 'girl', 'globe_with_meridians', 'goat', 'golf', 'grapes', 'green_apple', 'green_book',
		'green_heart', 'grey_exclamation', 'grey_question', 'grimacing', 'grin', 'grinning', 'guardsman', 'guitar', 'gun', 'haircut', 'hamburger', 'hammer',
		'hamster', 'handbag', 'hash', 'hatched_chick', 'hatching_chick', 'headphones', 'hear_no_evil', 'heart', 'heart_decoration',
		'heart_eyes', 'heart_eyes_cat', 'heartbeat', 'heartpulse', 'hearts', 'heavy_check_mark', 'heavy_division_sign', 'heavy_dollar_sign',
		'heavy_minus_sign', 'heavy_multiplication_x', 'heavy_plus_sign', 'helicopter', 'herb', 'hibiscus', 'high_brightness',
		'high_heel', 'honey_pot', 'horse', 'horse_racing', 'hospital', 'hotel', 'hotsprings', 'hourglass', 'hourglass_flowing_sand',
		'house', 'house_with_garden', 'hushed', 'ice_cream', 'icecream', 'id', 'ideograph_advantage', 'imp', 'inbox_tray',
		'incoming_envelope', 'information_desk_person', 'information_source', 'innocent', 'interrobang', 'iphone', 'it', 'izakaya_lantern',
		'jack_o_lantern', 'japan', 'japanese_castle', 'japanese_goblin', 'japanese_ogre', 'jeans', 'joy', 'joy_cat', 'jp', 'key', 'keycap_ten',
		'kimono', 'kiss', 'kissing', 'kissing_cat', 'kissing_closed_eyes', 'kissing_heart', 'kissing_smiling_eyes', 'koala', 'koko', 'kr',
		'large_blue_circle', 'large_blue_diamond', 'large_orange_diamond', 'last_quarter_moon', 'last_quarter_moon_with_face', 'laughing', 'leaves',
		'ledger', 'left_luggage', 'left_right_arrow', 'leftwards_arrow_with_hook', 'lemon', 'leo', 'leopard', 'libra', 'light_rail', 'link', 'lips', 'lipstick',
		'lock', 'lock_with_ink_pen', 'lollipop', 'loop', 'loudspeaker', 'love_hotel', 'love_letter', 'low_brightness', 'm', 'mag', 'mag_right', 'mahjong',
		'mailbox', 'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'man', 'man_with_gua_pi_mao', 'man_with_turban', 'mans_shoe', 'maple_leaf',
		'mask', 'massage', 'meat_on_bone', 'mega', 'melon', 'mens', 'metro', 'microphone', 'microscope', 'milky_way', 'minibus', 'minidisc',
		'mobile_phone_off', 'money_with_wings', 'moneybag', 'monkey', 'monkey_face', 'monorail', 'mortar_board', 'mount_fuji', 'mountain_bicyclist',
		'mountain_cableway', 'mountain_railway', 'mouse', 'mouse2', 'movie_camera', 'moyai', 'muscle', 'mushroom', 'musical_keyboard', 'musical_note',
		'musical_score', 'mute', 'nail_care', 'name_badge', 'necktie', 'negative_squared_cross_mark', 'neutral_face', 'new', 'new_moon',
		'new_moon_with_face', 'newspaper', 'ng', 'nine', 'no_bell', 'no_bicycles', 'no_entry', 'no_entry_sign', 'no_good', 'no_mobile_phones', 'no_mouth',
		'no_pedestrians', 'no_smoking', 'non-potable_water', 'nose', 'notebook', 'notebook_with_decorative_cover', 'notes', 'nut_and_bolt', 'o', 'o2',
		'ocean', 'octopus', 'oden', 'office', 'ok', 'ok_hand', 'ok_woman', 'older_man', 'older_woman', 'on', 'oncoming_automobile', 'oncoming_bus',
		'oncoming_police_car', 'oncoming_taxi', 'one', 'open_file_folder', 'open_hands', 'open_mouth', 'ophiuchus', 'orange_book',
		'outbox_tray', 'ox', 'package', 'page_facing_up', 'page_with_curl', 'pager', 'palm_tree', 'panda_face', 'paperclip', 'parking', 'part_alternation_mark',
		'partly_sunny', 'passport_control', 'peach', 'pear', 'pencil', 'pencil2', 'penguin', 'pensive', 'performing_arts', 'persevere',
		'person_frowning', 'person_with_blond_hair', 'person_with_pouting_face', 'pig', 'pig2', 'pig_nose', 'pill', 'pineapple', 'pisces', 'pizza',
		'point_down', 'point_left', 'point_right', 'point_up', 'point_up_2', 'police_car', 'poodle', 'poop', 'post_office', 'postal_horn', 'postbox',
		'potable_water', 'pouch', 'poultry_leg', 'pound', 'pouting_cat', 'pray', 'princess', 'punch', 'purple_heart', 'purse', 'pushpin',
		'put_litter_in_its_place', 'question', 'rabbit', 'rabbit2', 'racehorse', 'radio', 'radio_button',
		'railway_car', 'rainbow', 'raised_hand', 'raised_hands', 'raising_hand', 'ram', 'ramen', 'rat', 'recycle', 'red_car', 'red_circle', 'registered',
		'relaxed', 'relieved', 'repeat', 'repeat_one', 'restroom', 'revolving_hearts', 'rewind', 'ribbon', 'rice', 'rice_ball', 'rice_cracker',
		'rice_scene', 'ring', 'rocket', 'roller_coaster', 'rooster', 'rose', 'rotating_light', 'round_pushpin', 'rowboat', 'ru', 'rugby_football',
		'runner', 'running_shirt_with_sash', 'sa', 'sagittarius', 'sailboat', 'sake', 'sandal', 'santa', 'satellite', 'saxophone',
		'school', 'school_satchel', 'scissors', 'scorpius', 'scream', 'scream_cat', 'scroll', 'seat', 'secret', 'see_no_evil', 'seedling', 'seven', 'shaved_ice',
		'sheep', 'shell', 'ship', 'shirt', 'shower', 'signal_strength', 'six', 'six_pointed_star', 'ski', 'skull', 'sleeping',
		'sleepy', 'slot_machine', 'small_blue_diamond', 'small_orange_diamond', 'small_red_triangle', 'small_red_triangle_down', 'smile', 'smile_cat',
		'smiley', 'smiley_cat', 'smiling_imp', 'smirk', 'smirk_cat', 'smoking', 'snail', 'snake', 'snowboarder', 'snowflake', 'snowman', 'sob', 'soccer',
		'soon', 'sos', 'sound', 'space_invader', 'spades', 'spaghetti', 'sparkle', 'sparkler', 'sparkles', 'sparkling_heart', 'speak_no_evil', 'speaker',
		'speech_balloon', 'speedboat', 'star', 'star2', 'stars', 'station', 'statue_of_liberty', 'steam_locomotive', 'stew', 'straight_ruler',
		'strawberry', 'stuck_out_tongue', 'stuck_out_tongue_closed_eyes', 'stuck_out_tongue_winking_eye', 'sun_with_face', 'sunflower', 'sunglasses',
		'sunny', 'sunrise', 'sunrise_over_mountains', 'surfer', 'sushi', 'suspension_railway', 'sweat', 'sweat_drops', 'sweat_smile', 'sweet_potato',
		'swimmer', 'symbols', 'syringe', 'tada', 'tanabata_tree', 'tangerine', 'taurus', 'taxi', 'tea', 'telephone', 'telephone_receiver', 'telescope',
		'tennis', 'tent', 'thought_balloon', 'three', 'thumbsdown', 'thumbsup', 'ticket', 'tiger', 'tiger2', 'tired_face', 'tm', 'toilet', 'tokyo_tower',
		'tomato', 'tongue', 'top', 'tophat', 'tractor', 'traffic_light', 'train', 'train2', 'tram', 'triangular_flag_on_post', 'triangular_ruler', 'trident',
		'triumph', 'trolleybus', 'trophy', 'tropical_drink', 'tropical_fish', 'truck', 'trumpet', 'tulip', 'turtle', 'tv',
		'twisted_rightwards_arrows', 'two', 'two_hearts', 'two_men_holding_hands', 'two_women_holding_hands', 'u5272', 'u5408', 'u55b6', 'u6307', 'u6708',
		'u6709', 'u6e80', 'u7121', 'u7533', 'u7981', 'u7a7a', 'umbrella', 'unamused', 'underage', 'unlock', 'up', 'us', 'v', 'vertical_traffic_light',
		'vhs', 'vibration_mode', 'video_camera', 'video_game', 'violin', 'virgo', 'volcano', 'vs', 'walking', 'waning_crescent_moon', 'waning_gibbous_moon',
		'warning', 'watch', 'water_buffalo', 'watermelon', 'wave', 'wavy_dash', 'waxing_crescent_moon', 'waxing_gibbous_moon', 'wc', 'weary', 'wedding',
		'whale', 'whale2', 'wheelchair', 'white_check_mark', 'white_circle', 'white_flower', 'white_large_square', 'white_medium_small_square',
		'white_medium_square', 'white_small_square', 'white_square_button', 'wind_chime', 'wine_glass', 'wink', 'wolf', 'woman', 'womans_clothes',
		'womans_hat', 'womens', 'wombat', 'worried', 'wrench', 'x', 'yellow_heart', 'yen', 'yum', 'zap', 'zero', 'zzz'
	];

	// Data values for atwho to work with
    emojies = $.map(emojies, function(value, i) {
		return {key: value, name: value};
	});

	/**
	 * Load in any options
	 *
	 * @param {object} options
	 */
	function elk_Emoji(options) {
		// All the passed options and defaults are loaded to the opts object
		this.opts = $.extend({}, this.defaults, options);
	}

	/**
	 * Helper function to see if a :tag: emoji is one we know
	 *
	 * @param {string} emoji
	 */
	elk_Emoji.prototype.emojiExists = function(emoji) {
		return emojies.some(function(el) {
			return el.key === emoji;
		});
	};

	/**
	 * Attach atwho to the passed $element so we create a pull down list
	 *
	 * @param {object} oEmoji
	 * @param {object} $element
	 * @param {object} oIframeWindow
	 */
	elk_Emoji.prototype.attachAtWho = function(oEmoji, $element, oIframeWindow) {
		var emoji = document.getElementById('emoji');

		// Our div to hold results
		if (emoji === null)
			$('#' + oEmoji.opts.editor_id).after(oEmoji.opts._emoji);
		else
			oEmoji.opts._emoji = $(emoji);

		// Does not get much easier than this, use the github cdn for the selection box
		// but insert our own site location when one is selected.
		$element.atwho({
			at: ":",
			data: emojies,
			delay: 200,
			limit: 7,
			tpl:"<li data-value=':${key}:'>${name} <img style='max-width:20px;float:right;' src='https://assets-cdn.github.com/images/icons/emoji/${key}.png '/></li>",
			insert_tpl: "<img data-sceditor-emoticon=':${key}:' alt=':${key}:' title='${name}' src='" + oEmoji.opts.emoji_url + "/${name}.png' />",
			callbacks: {
				filter: function (query, items, search_key) {
					// Don't show the list until they have entered at least two characters
					if (query.length < 2)
						return [];
					else
						return items;
				}
			}
		});

		// Don't save a draft due to a emoji window open/close
		$(oIframeWindow).on("shown.atwho", function(event, offset) {
			disableDrafts = true;
		});
		$(oIframeWindow).on("hidden.atwho", function(event, offset) {
			disableDrafts = false;
		});

		// Attach a click event to the toggle button, can't find a good plugin event to use
		// for this purpose
		if (typeof(oIframeWindow) !== 'undefined')
		{
			$(".sceditor-button-source").on("click", function(event, offset) {
				// If the button has the active class, we clicked and entered wizzy mode
				if ($(this).hasClass("active"))
					elk_Emoji.prototype.processEmoji();
			});
		}
	};

	/**
	 * Fetches the HTML from the editor window and updates any emoji :tags: with img tags
	 *
	 * @returns {undefined}
	 */
	elk_Emoji.prototype.processEmoji = function() {
		var instance, // sceditor instance
			str, // current html in the editor
			emoji_url = elk_smileys_url.replace("default", "emoji"), // where the emoji images are
			emoji_regex = new RegExp("(:([-+\\w]+):)", "gi"), // find emoji
			code_regex = new RegExp("(</code>|<code(?:[^>]+)?>)", "gi"), // split around code tags
			str_split = [],
			i = 0,
			n = 0;

		// Get the editors instance and html code from the window
		instance = $('#' + post_box_name).sceditor('instance');
		str = instance.getWysiwygEditorValue(false);

		// Only convert emoji outside <code> tags.
		str_split = str.split(code_regex);
		n = str_split.length;

		// Process the stirngs
		for (var i = 0; i < n; i++)
		{
			// Only look for emoji outside the code tags
			if (i % 4 === 0)
			{
				// Search for emoji :tags: and replace known ones with the right image
				str_split[i] = str_split[i].replace(emoji_regex, function(match, tag, shortname) {
					// Replace all valid emoji tags with the image tag
					if ((typeof(shortname) === 'undefined') || (shortname === '') || (!(elk_Emoji.prototype.emojiExists(shortname))))
						return match;
					else
						return '<img data-sceditor-emoticon="' + tag + '" alt="' + tag + '" title="' + shortname + '" src="' + emoji_url + '/' + shortname + '.png" />';
				});
			}
		}

		// Put it all back together
		str = str_split.join('');

		// Replace the editors html with the update html
		instance.val(str, false);
	};

	/**
	 * Private emoji vars
	 */
	elk_Emoji.prototype.defaults = {
		_emoji: $('<div style="display:none" />')
	};

	/**
	 * Holds all current emoji (defaults + passed options)
	 */
	elk_Emoji.prototype.opts = {};

	/**
	 * Emoji plugin interface to SCEditor
	 *  - Called from the editor as a plugin
	 *  - Monitors events so we control the emoji's
	 */
	$.sceditor.plugins.emoji = function() {
		var base = this,
			oEmoji;

		/**
		 * Initialize, called when sceditor starts and initializes plugins
		 */
		base.signalReady = function() {
			// Init the mention instance, load in the options
			oEmoji = new elk_Emoji(this.opts.emojiOptions);

			if (typeof(oEmoji.opts.editor_id) === 'undefined')
				oEmoji.opts.editor_id = post_box_name;

			oEmoji.opts.emoji_url = elk_smileys_url.replace("default", "emoji");

			// Attach atwho to the textarea
			oEmoji.attachAtWho(oEmoji, $('#' + oEmoji.opts.editor_id).parent().find('textarea'));

			// Using wysiwyg, then lets attach atwho to it as well
			var instance = $('#' + oEmoji.opts.editor_id).sceditor('instance');
			if (!instance.opts.runWithoutWysiwygSupport)
			{
				// We need to monitor the iframe window and body to text input
				var oIframe = $('#' + oEmoji.opts.editor_id).parent().find('iframe')[0],
					oIframeWindow = oIframe.contentWindow,
					oIframeBody = $('#' + oEmoji.opts.editor_id).parent().find('iframe').contents().find('body')[0];

					oEmoji.attachAtWho(oEmoji, $(oIframeBody), oIframeWindow);
			}
		};
	};
})(jQuery, window, document);