jQuery minimap
==============

> This plugin provides a "minimap" for in-page navigation, similar to that in
> Sublime Text 2.

[_View it in action_](http://goldenapples.github.io/jquery.minimap/)

This came from UX discussions while redesigning Janrain's documentation site.
Specifically, we tried to include long-form narrative content as much as
possible, with lots of screenshots, tables, and inline graphics. We made good
use of jQuery waypoints for in-page navigation, but we felt that even so, users
would want a better way to orient themselves to where they are on the page, and
an easier way to jump to the section they want.


### Usage:

Usage is as simple as possible. Just target the body column element and call the
plugin like this:

    $('#body_column').minimap();

Or pass the body column to the plugin as an _option_:

    $.minimap({ body_col: '#body_column' });


### Options:

Options can be passed to the plugin to override a number of defaults.


| Option         | Meaning                                                 | Default Value                                                                                            |
|----------------|---------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `body_col`     | element to use as the body                              | The current context of _this_                                                                            |
| `map_col`      | custom element to draw the map in                       | If not specified, will insert the following element: `<aside class="map_col"></aside>` before `body_col` |
| `toggle_btn`   | An element to use to toggle visibility of the minimap   | None                                                                                                     |
| `draggable`    | Whether to use jQuery.ui.draggable controls             | True if jQuery.ui is loaded, false otherwise                                                             |
| `scrollto`     | Whether to use jQuery.scrollTo to animate scrolling     | True if jQuery.scrollTo is loaded, false otherwise.                                                      |
| `map_header`   | Custom content to put in a "header" of the map column   |                                                                                                          |

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

- For the effect to work, the minimap column should have a fixed position and be
  set to 100% of the window height. This works best if the `html` and `body`
  elements have heights defined to 100%.
- Depends on CSS scaling transforms, so will not work in browsers that don't
  support that (IE <= 8, Android <= 2.3): http://caniuse.com/#search=transform
- Because this clones the entire content of the page, in-page search may behave
  somewhat unexpectedly (Ctrl-F will find every search term twice; once in the
  minimap and once in the page itself).
