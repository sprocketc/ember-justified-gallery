import Ember from 'ember';
import layout from '../templates/components/justified-gallery';

export default Ember.Component.extend({
  layout: layout,

  /**
   The preferred height of rows in pixel.
   */
  rowHeight: 120,

  /**
   	A number (e.g 200) which specifies the maximum row height in pixel.
    A negative value to don't have limits. Alternatively, a string which
    specifies a percentage (e.g. 200% means that the row height can't exceed
    2 * rowHeight)
   */
  maxRowHeight: '200%',

  /**
    Describes the suffix for each size range. By default other thumbnails are
    not searched.

    To agree with the Flickr's suffixes you should change it in the following
    way:

    {'lt100':'_t',
    'lt240':'_m',
    'lt320':'_n',
    'lt500':'',
    'lt640':'_z',
    'lt1024':'_b'}

    The keys could be specified also as numbers
    (e.g. {512:'_small', 1024:'_big'} to specify the '_small' suffix for images
    which are less than 512px on the longest side, and '_big' for the bigger
    ones).
   */
  sizeRangeSuffixes: {},

  /**
    To configure a custom thumbnail selector rather than using
    sizeRangeSuffixes, to have more flexibility in particular situations.

    For example, to select the correct thumbnail changing only a suffix of the
    current filename (like we can done using sizeRangeSuffixes)
   */
  thumbnailPath: undefined,

  /**
    Decide to justify the last row (using 'justify') or not (using 'nojustify'),
    or to hide the row if it can't be justified (using 'hide'). By default,
    using 'nojustify', the last row images are aligned to the left, but they can
    be also aligned to the center (using 'center') or to the right (using
    'right').
   */
  lastRow: 'nojustify',

  /**
    Decide if you want to have a fixed height. This mean that all the rows will
    be exactly with the specified rowHeight.
   */
  fixedHeight: false,

  /**
    Decide if you want to show the caption or not, that appears when your mouse
    is over the image.
   */
  captions: true,

  /**
    Decide the margins between the images
   */
  margins: 1,
  _marginsChanged: Ember.observer('margins', function() {
    this.$().justifiedGallery({
      margins: this.get('margins')
    });
  }),

  /**
    Decide the border size of the gallery. With a negative value the border will
    be the same as the margins.
   */
  border: -1,

  /**
    In presence of width and height attributes in thumbnails, the layout is
    immediately built, and the thumbnails will appear randomly while they are
    loaded.
   */
  waitThumbnailsLoad: true,

  /**
    Automatically randomize or not the order of photos.
   */
  randomize: false,

  /**
    Can be:

      false: for a disabled filter.

      a string: an entry is kept if entry.is(filter string) returns true (see
      jQuery's .is() function for further information).

      a function: invoked with arguments (entry, index, array). Return true to
      keep the entry, false otherwise. see Array.prototype.filter for further
      information.
   */
  filter: false,

  /**
    Can be:

      false: to do not sort.

      a function: to sort them using the function as comparator (see
      Array.prototype.sort()).
   */
  sort: false,

  /**
    Used to determines which are the entries of the gallery.
   */
  selector: '> a, > div:not(.spinner)',

  /**
    Specify the extension for the images with a regex. Is used to reconstruct
    the filename of the images, change it if you need. For example /.jpg$/ is to
    detect only the ".jpg" extension and no more.
   */
  extension: /.[^.]+$/,

  /**
    The waited time before checking the page size. If the page width has changed
    the gallery layout is rebuilt.
   */
  refreshTime: 250,

  /**
    Change in width allowed (in px) without re-building the gallery.
   */
  refreshSensitivity: 0,

  /**
    To rewrite all the links rel attribute with the specified value. For example
    can be 'gallery1', and is usually used to create gallery group for the
    lightbox (e.g. Colorbox).
   */
  rel: undefined,

  /**
    To rewrite all the links target attribute with the specified value. For
    example, if you don't use a lightbox, specifying '_blank', all the images
    will be opened to another page.
   */
  target: undefined,

  /**
    If 'available space' / 'row width' > 0.75 the last row is justified, even
    though the lastRow setting is 'nojustify'.
   */
  justifyThreshold: 0.75,

  /**
    Use or not css animations. Using css animations you can change the behavior
    changing the justified gallery CSS file, or overriding that rules.
   */
  cssAnimation: false,

  /**
    Image fadeIn duration (in milliseconds).
   */
  imagesAnimationDuration: 300,

  /**
    Caption settings. To configure the animation duration (in milliseconds), the
    caption opacity when the mouse is over (i.e. it should be visible), and the
    caption opacity when the mouse is not over (i.e. it should be not visible).
   */
  captionSettings: {
    animationDuration: 500,
    visibleOpacity: 0.7,
    nonVisibleOpacity: 0.0
  },

  initGallery: Ember.on('didInsertElement', function() {
    this.$().justifiedGallery({
      rowHeight: this.get('rowHeight'),
      maxRowHeight: this.get('maxRowHeight'),
      sizeRangeSuffixes: this.get('sizeRangeSuffixes'),
      thumbnailPath: this.get('thumbnailPath'),
      lastRow: this.get('lastRow'),
      fixedHeight: this.get('fixedHeight'),
      captions: this.get('captions'),
      margins: this.get('margins'),
      border: this.get('border'),
      waitThumbnailsLoad: this.get('waitThumbnailsLoad'),
      randomize: this.get('randomize'),
      filter: this.get('filter'),
      sort: this.get('sort'),
      selector: this.get('selector'),
      refreshTime: this.get('refreshTime'),
      target: this.get('target'),
      rel: this.get('rel'),
      refreshSensitivity: this.get('refreshSensitivity'),
      justifyThreshold: this.get('justifyThreshold'),
      cssAnimation: this.get('cssAnimation'),
      imagesAnimationDuration: this.get('imagesAnimationDuration'),
      captionSettings: this.get('captionSettings')
    }).on('jg.complete', () => this.sendOnComplete() );
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
  }
});
