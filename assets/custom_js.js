

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);


/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    var box = document.getElementById("dkbox")

    style = window.getComputedStyle(box),
    direction = style.getPropertyValue('flex-direction');

        if (direction == "row"){
            if (prevScrollpos > currentScrollPos) {
                box.style.top = "0";
            } else {
                box.style.top = "-45px";
            }
        }
        else{
            box.style.top = "0";
        }

    prevScrollpos = currentScrollPos;
}

*/


$('#dkbox').hover(
       function(){
        $(this).addClass('nav-down')
        $(this).removeClass('nav-up')
    },
       function(){}
)





$(window).scroll(function(event) {
    nav_bar();

});


var prevScrollpos = window.pageYOffset;
function nav_bar(jQuery){

    var first_one = false;
  
  $(".nav-anchor, .little-box").each(function(i, el) {
    var el = $(el);
    if (el.visible(true) & !first_one) {
        $(".nav-item").each( function () {
            if ($(this).attr('href') == '#'+el.attr('id') ){
                $(this).addClass("current");
            }
        }); 
        first_one=true;
    }
    else {
        $(".nav-item").each( function () {
            if ($(this).attr('href') == '#'+el.attr('id') ){
                $(this).removeClass("current");
            }
        }); 
    }
  });


  var currentScrollPos = window.pageYOffset;
  $("#dkbox").each(function(i, el) {
    console.log($(this))
    if ($(this).css("flex-direction") == "row"){
        if (prevScrollpos > currentScrollPos) {
            $(this).addClass('nav-down')//$(this).css('top',"0");
            $(this).removeClass('nav-up')
        } else {
            $(this).addClass('nav-up')//$(this).css('top',"-45px");
            $(this).removeClass('nav-down')
        }
    }
    else{
        $(this).addClass('nav-down')//$(this).css('top',"0");
        $(this).removeClass('nav-up')
    }


  });
  prevScrollpos = currentScrollPos;
  
}




//Add Darkmode functionallity


$(function () {
    $("#darkmode").change(function () {
        if ($(this).is(":checked")) {
            // ALT: Just set mode on body
            document.body.classList.remove('light-mode');
        } else {
            // ALT: Just set mode on body
            document.body.classList.add('light-mode');
        }
    });
});

/*
    * Replace all SVG images with inline SVG
    - copied from Bloggerschmidt (https://gist.github.com/Bloggerschmidt), modified according to some useful comments
*/
$(document).ready(readyFn);

$(window).on('load', function () {
    $(".load_hider").css('opacity', '1.0');

});


function readyFn(jQuery) {

    // Replace SVG images with inline
    jQuery('img').filter(function () {
        return this.src.match(/.*\.svg$/);
    }).each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');


        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            removeStyles($svg)

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

    nav_bar();

}


function removeStyles(el) {
    el.removeAttr('style');

    jQuery(el).find('g').each(function () {
        var $g = jQuery(this).find('g');
        $g.removeAttr('style');
    });

}







