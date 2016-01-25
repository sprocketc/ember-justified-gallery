import Ember from 'ember';
import layout from '../templates/components/justified-gallery';

export default Ember.Component.extend({
  layout: layout,

  initGallery: Ember.on('didInsertElement', function() {
    const options = this.getOptions();
    this.$().justifiedGallery(options).on('jg.complete', () => this.sendOnComplete() );
  }),

  destroyGallery: Ember.on('willDestroyElement', function() {
    this.$().justifiedGallery('destroy');
  }),

  sendOnComplete: function () {
    const { onComplete } = this.attrs;

    if (Ember.typeOf(onComplete) === 'function') {
      onComplete();
    } else {
      this.sendAction('onComplete');
    }
  },

  watchChanged: Ember.observer('watch', function() {
    Ember.run.once(this, 'noRewind');
  }),

  noRewind() {
    this.$().justifiedGallery('norewind');
  },

  setOptions() {
    const options = this.getOptions();

    if (Object.keys(options).length !== 0) {
      this.$().justifiedGallery(options);
    }
  },

  getOptions() {
    const options = [
      'rowHeight',
      'maxRowHeight',
      'sizeRangeSuffixes',
      'thumbnailPath',
      'lastRow',
      'fixedHeight',
      'captions',
      'margins',
      'border',
      'waitThumbnailsLoad',
      'randomize',
      'filter',
      'sort',
      'selector',
      'refreshTime',
      'target',
      'rel',
      'refreshSensitivity',
      'justifyThreshold',
      'cssAnimation',
      'imagesAnimationDuration',
      'captionSettings'
    ];
    const galleryOptions = {};

    for (let i = 0; i < options.length; i++) {
      const value = this.get(options[i]);
      if (Ember.isPresent(value)) {
        galleryOptions[options[i]] = value;
      }
    }

    return galleryOptions;
  },

  optionsChanged: Ember.observer(
    'rowHeight',
    'maxRowHeight',
    'sizeRangeSuffixes',
    'thumbnailPath',
    'lastRow',
    'fixedHeight',
    'captions',
    'margins',
    'border',
    'waitThumbnailsLoad',
    'randomize',
    'filter',
    'sort',
    'selector',
    'refreshTime',
    'target',
    'rel',
    'refreshSensitivity',
    'justifyThreshold',
    'cssAnimation',
    'imagesAnimationDuration',
    'captionSettings',
    function() {
      Ember.run.once(this, 'setOptions');
    }
  )
});
