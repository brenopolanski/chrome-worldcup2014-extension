$(function() {
	'use strict'

	var BASE_URL_TEAMS = 'img/teams/';

	var app = {
		init: function() {
			this.matchesCurrent();
		},

		matchesCurrent: function() { 			
			$.ajax({
				type: 'GET',
				url: 'http://worldcup.sfg.io/matches',
				dataType: 'json',
				success: function(data) {
					// console.log(data[0].home_team.code);
					app._appendLocation(data[0].location);
					app._appendHomeTeam(data[0].home_team.code, data[0].home_team.goals);
					app._appendAwayTeam(data[0].away_team.code, data[0].away_team.goals);
				}
			});
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
		}
	};

	return app.init();
});