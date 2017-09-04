import Ember from 'ember';

const {computed, debug} = Ember;

// This component enables a list of tracks to be filtered by hashtags

export default Ember.Component.extend({
	filter: '',

	// Returns either all tracks or the filtered tracks by hashtag
	filtered: computed('filter', 'tracks', function () {
		const filter = this.get('filter');
		const tracks = this.get('tracks');

		if (!filter) {
			return tracks;
		}

		// returns models which has the filter (the tag)
		// in their hashtags property
		return tracks.filter(track => {
			const hashtags = track.get('hashtags');

			if (!hashtags) {
				return false;
			}

			return hashtags.includes(filter);
		});
	}),

	// Returns the unique tags from all models
	tags: computed('tracks.@each.hashtags', function () {
		const tracks = this.get('tracks');
		let tags = tracks.getEach('hashtags');

		debug('tags computed (keep this low)');

		// Remove tracks without hashtags
		tags = tags.compact();

		// Flatten the array
		// or alternative lodash version: _.flatten
		tags = (tags.join(',')).split(',');

		// Only keep uniques
		tags = tags.uniq();

		// Remove more empty ones (todo: shouldn't be necessary)
		tags = tags.filter(tag => tag !== '');

		return tags;
	}),

	actions: {
		setTag(tag) {
			console.log(tag)
			this.set('filter', tag)
		}
	}
});
