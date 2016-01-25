# Ember-justified-gallery
[![Build Status](https://travis-ci.org/sprocketc/ember-justified-gallery.svg?branch=master)](https://travis-ci.org/sprocketc/ember-justified-gallery) [![Code Climate](https://codeclimate.com/github/sprocketc/ember-justified-gallery/badges/gpa.svg)](https://codeclimate.com/github/sprocketc/ember-justified-gallery) [![npm version](https://badge.fury.io/js/ember-justified-gallery.svg)](https://badge.fury.io/js/ember-justified-gallery)

This addon integrates the [justified-gallery](https://miromannino.github.io/Justified-Gallery/) jquery plugin.

## Installation

* `ember install ember-justified-gallery`

## Usage

Just wrap the gallery you want with the `justified-gallery` component.

```handlebars
{{#justified-gallery}}
  {{#each images as |image|}}
    <a href="{{image.src}}">
      <img src="{{image.thumb}}" alt="{{image.title}}">
    </a>
  {{/each}}
{{/justified-gallery}}
```
For more information about the supported formats of the gallery check the [input-formats documentation](https://miromannino.github.io/Justified-Gallery/input-formats/) of the jquery plugin.

## Options

Pass the options you want to the component

```handlebars
{{#justified-gallery captions=false}}
  ...
{{/justified-gallery}}
```
The `justified-gallery` component supports all the available options of the jquery plugin.
For more info check the [options-and-events documentation](https://miromannino.github.io/Justified-Gallery/options-and-events/).

Every option is observable and can be changed after the initialization.

## Events

The addon supports the onComplete event of the jquery plugin. Set the function or the action you want to execute after the gallery initialization.

```handlebars
{{#justified-gallery onComplete=testFunction}}
  ...
{{/justified-gallery}}
```

```handlebars
{{#justified-gallery onComplete='testAction'}}
  ...
{{/justified-gallery}}
```
## Observer

To auto update the gallery when new images are added without reseting the component, set the `watch` option to the object you want to be observed by the component.

```handlebars
{{#justified-gallery watch=myObject}}
  ...
{{/justified-gallery}}
```
Whenever the object changes, the `norewind` command of the jquery plugin will be executed and only the newest images will be justified.

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
