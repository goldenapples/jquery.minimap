/*
 * jQuery.minimap - https://github.com/goldenapples/jquery.minimap
 * Version: 1.0 (2013-10-28)
 * Requires: jQuery
 *
 * Released under the MIT license.
 * https://github.com/goldenapples/jQuery.minimap/blob/master/LICENSE.txt
 */

(function($) {
  $.fn.minimap = function(settings) {

    var settings = $.extend({
      body_col: '',
      map_col: '',
      toggle_btn: '',
      draggable: (typeof $.fn.draggable !== 'undefined'),
      map_header: '<header class="map-header">' +
        '<span class="janrain-icon-compass"></span> ' +
        'Page Map<span role="toggle-map" class="right janrain-icon-ex"></span></header>'
    }, settings);

    var body_col = (settings.body_col) ? $(settings.body_col) : $(this);

    var map_col = (settings.map_col) ? $(settings.map_col) : $( '<aside class="map_col"></aside>' );

    var map_header = $(settings.map_header).appendTo( map_col );

    map_col
      .insertBefore( body_col );


    var miniMapSetup = false,
        scrolling = false,
        resizing = false;

    // Performs the inital minimap setup: clones the element defined as the body_column,
    // removes any scripts, links, etc., and inserts the map column before the body columN
    (function() {

      if ( miniMapSetup ) return;

      var miniMapHolder = map_col,
          miniMapHeight = Math.min(
            miniMapHolder.parent().height(),
            $(window).height()
          ),
          miniMapOffsetTop = (map_header) ? map_header.outerHeight() : 0,
          miniMapWidth = miniMapHolder.width(),
          bodyCol = body_col,
          bodyHeight = bodyCol.height(),
          bodyWidth = $('.body_col').width() - miniMapWidth,
          scaling = Math.min(
            ( miniMapWidth - 12 ) / bodyWidth,
            ( miniMapHeight - 24) / bodyHeight
          ),
          mapWaypoint;

      var miniMapWrapElt = $('<div></div>')
        .addClass('map-col-background')
        .css({
          position: 'fixed',
          width: miniMapWidth -1,
          height: miniMapHeight,
          top: miniMapOffsetTop,
          overflow: 'hidden'
        })
        .appendTo(miniMapHolder);

      var miniMap = bodyCol
        .clone(false)
        .css({
          background: 'transparent',
          color: 'black',
          width: bodyWidth,
          position: 'absolute',
          top: '6px',
          right: ( miniMapWidth - scaling * bodyWidth ) / 2,
          opacity: '1',
          'transform': 'scale('+scaling+')',
          'transform-origin': 'top right',
          '-webkit-transform': 'scale('+scaling+')',
          '-webkit-transform-origin': 'top right'
        });

      miniMap.find('script').remove();
      miniMap.find('a.section-bookmark').remove();
      miniMap.find('#footer').remove();
      miniMap.find('#wpadminbar').remove();
      miniMap.find('.section-bookmark').remove();
      miniMap.appendTo( miniMapWrapElt );

      miniMapOverlay = $('<div></div>')
        .css({
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        })
        .addClass('mini-map-clickable')
        .appendTo( miniMapWrapElt );

      mapWaypoint = $('<div class="miniMapOverlay ui-draggable"></div>')
        .css({
          background: 'rgba(26, 45, 58, .1)',
          width: '100%',
          position: 'absolute'
        })
        .appendTo( miniMapWrapElt );

      // Redraw the entire minimap when a window.resize event is detected
      // (resizing may have caused reflow).
      $(window).on( 'resize.minimap', function() {
        if ( resizing ) {
          return;
        }
        resizing = true;

        bodyHeight = bodyCol.height();
        bodyWidth = bodyCol.width();
        miniMapHeight = miniMapHolder.height();
        miniMapWidth = miniMapHolder.width();
        miniMapOffsetTop = (map_header) ? map_header.height() : 0;
        winHeight = $(window).height();
        scaling = Math.min(
          ( miniMapWidth - 12 ) / bodyWidth,
          ( miniMapHeight - 24 ) / bodyHeight
        );

        miniMapWrapElt.css({
          height: miniMapHeight
        });
        miniMap.css({
          width: bodyWidth,
          right: ( miniMapWidth - scaling * bodyWidth ) / 2,
          'transform': 'scale('+scaling+')',
          'transform-origin': 'top right',
          '-webkit-transform': 'scale('+scaling+')',
          '-webkit-transform-origin': 'top right'
        });

        $(window).trigger( 'scroll.minimap' );
        resizing = false;
      });

      // Reposition current location marker on minimap when a window.scroll
      // event is detected.
      $(window).on( 'scroll.minimap', function() {

        if ( scrolling ) {
          return;
        }
        scrolling = true;

        var loc = $(window).scrollTop(),
        winHeight = $(window).height();

        mapWaypoint.css({
          top: loc * scaling + 6,
          height: winHeight * scaling
        });

        scrolling = false;
      });

      miniMapSetup = true;

      $('.miniMapOverlay').draggable({
        axis: 'y',
        containment: 'parent',
        drag: function( event, ui ) {
          // It shouldn't be necessary to look up the actual CSS property of the object,
          // but because of the combination of the CSS transform and the draggable helper,
          // both offset.top and position.top are returning very weird results.
          var dragLoc = parseFloat( $(ui.helper).css('top') ) - 6;
          $(window).scrollTop( dragLoc / scaling );
        }
      });

      $('.mini-map-clickable').click(function(event){
        var clickTop = event.clientY - $('.map_col').offset().top - 60,
            winHeight = ( $(window).height() - miniMapOffsetTop ) * scaling;
        clickCenter = Math.max( 0, (clickTop - winHeight / 2) );

        $(window).scrollTop( clickCenter / scaling );
      });

    })();

    // Wait for all content to render before initially scaling the mini-map
    $(window).load(function() {
      console.log( utilities );
      utilities.toggle( window.localStorage.getItem('miniMapActive') );
    });

    var utilities = {
      vis: window.localStorage.getItem('miniMapActive'),

      toggle: function(showMap) {
        if (typeof showMap === 'undefined') {
          showMap = !vis
        }

        if ( showMap ) {
          $('body').addClass( 'mini-map-active' );
        } else {
          $('body').removeClass( 'mini-map-active' );
        }

        localStorage.setItem( 'miniMapActive', showMap );
        $(window).trigger('resize.minimap');
      },

      show: function() {
        return this.toggle(true)
      },

      hide: function() {
        return this.toggle(false)
      }
    };

    return utilities
  };
}(jQuery));
