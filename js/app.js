/**
 * Copyright 2014, All Rights Reserved.
 *
 * Code licensed under the MIT License:
 * http://brenopolanski.mit-license.org
 *
 * @author Breno Polanski <breno.polanski@gmail.com>
 * Release version 0.1.0
 */
$(function() {
	'use strict'

	var BASE_URL_TEAMS = 'img/teams/',
	    MATCH = 1;

	var app = {
		init: function() {
			this._matchesCurrent();
		},

		_matchesCurrent: function() { 			
			$.ajax({
				type: 'GET',
				url: 'http://worldcup.sfg.io/matches/current',
				dataType: 'json',
				success: function(data) {
					$('.loading').hide();
					$('.vs').show();
					app._clearLocalStorage(data);
					app._createLocalStorage();
					app._appendLocation(data[MATCH].location);
					app._appendHomeTeam(data[MATCH].home_team.code, data[MATCH].home_team.goals);
					app._appendAwayTeam(data[MATCH].away_team.code, data[MATCH].away_team.goals);
					app._eventHomeTeam(data[MATCH].home_team_events);
					app._eventAwayTeam(data[MATCH].away_team_events);
				}
			});
		},

		_clearLocalStorage: function(data) {
			if (data.length <= 0) {
				localStorage.clear();
			}
		},

		_createLocalStorage: function() {
			if (!localStorage.getItem('home_team')) {
				localStorage.setItem('home_team', 0);
			}
			else if (!localStorage.getItem('away_team')) {
				localStorage.setItem('away_team', 0);	
			}
		},

		_appendLocation: function(location) {
			$('.location').text(location);
		},

		_appendHomeTeam: function(code, goals) {
			$('.home-team > img').attr('src', BASE_URL_TEAMS + code.toLowerCase() + '.png');
			$('.home-team-goal').text(goals);
		},

		_appendAwayTeam: function(code, goals) {
			$('.away-team > img').attr('src', BASE_URL_TEAMS + code.toLowerCase() + '.png');
			$('.away-team-goal').text(goals);
		},

		_eventHomeTeam: function(arr) {
			if (arr.length > 0 && arr.length > Number(localStorage.getItem('home_team'))) {
				if (Notification.permission === 'granted') {
					var notification = new Notification(
						arr[arr.length-1].type_of_event + ' ' + arr[arr.length-1].time + '"', {
							body: arr[arr.length-1].player,
							icon: this._iconTypeEvent(arr[arr.length-1].type_of_event)
						}
					);
				}

				localStorage.setItem('home_team', arr.length);
			}
		},

		_eventAwayTeam: function(arr) {
			if (arr.length > 0 && arr.length > Number(localStorage.getItem('away_team'))) {
				if (Notification.permission === 'granted') {
					var notification = new Notification(
						arr[arr.length-1].type_of_event + ' ' + arr[arr.length-1].time + '"', {
							body: arr[arr.length-1].player,
							icon: this._iconTypeEvent(arr[arr.length-1].type_of_event)
						}
					);
				}

				localStorage.setItem('away_team', arr.length);
			}
		},

		_iconTypeEvent: function(event) {
			switch (event){
			case 'goal':
				return 'img/soccer-ball.png';
				break;
			case 'goal-penalty':
				return 'img/soccer-ball.png';
				break;
			case 'goal-own':
				return 'img/soccer-ball.png';
				break;
			case 'yellow-card':
				return 'img/card.png';
				break;
			case 'red-card':
				return 'img/card.png';
				break;
			case 'substitution-in':
				return 'img/substitution.png';
				break;
			case 'substitution-out':
				return 'img/substitution.png';
				break;
			case 'substitution-in halftime':
				return 'img/substitution.png';
				break;
			case 'substitution-out halftime':
				return 'img/substitution.png';
				break;
			}
		}
	};

	return app.init();
});