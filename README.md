jQuery minimap
==============

This plugin provides a "minimap" for in-page navigation, similar to that in
Sublime Text 2.

View this plugin in action:
- [Demo 1: Moby Dick](http://goldenapples.github.io/jquery.minimap/)


### Usage:

Usage is as simple as possible. Just target the body column element and call the
plugin like this:

    $('#body_column').minimap();

Or pass the body column to the plugin as an _option_:

    $.minimap({ body_col: '#body_column' });


### Options:

Options can be passed to the plugin to override a number of defaults.


| Option     | Meaning                                               | Default Value                                                                                          |
|------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| body_col   | element to use as the body                            | None                                                                                                   |
| map_col    | custom element to draw the map in                     | If not specified, will insert the following element: `<aside class="map_col"></aside>` before body_col |
| toggle_btn | An element to use to toggle visibility of the minimap | None                                                                                                   |
| draggable  | Whether to use jQuery.ui.draggable controls           | True is jQuery.ui is loaded, false otherwise                                                           |
| scrollto   | Whether to use jQuery.scrollTo to animate scrolling   | True if jQuery.scrollTo is loaded, false otherwise.                                                    |
| map_header | Custom content to put in a "header" of the map column |                                                                                                        |

### Utility functions:

The plugin uses a localStorage entry to determine the users' preference for
showing or hiding the minimap. The following utility functions update that value
as well as showing or hiding the map.

- `$.minimap.show()`: show the minimap.
- `$.minimap.hide()`: hide the minimap.
- `$.minimap.toggle()`: toggle the minimap.


### Styling:

View the stylesheet provided for some tips.

Some caveats:

- This will only work if the `html` and `body` elements have heights
  defined to 100%.
