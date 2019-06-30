console.log("Custom JS loaded");



$(function () {
    $("#darkmode").change(function () {
        console.log("darkmode switch clicked")
        if ($(this).is(":checked")) {
            console.log("dark mode");
            // ALT: Just set mode on body
            document.body.classList.remove('light-mode');
        } else {
            console.log("light mode");
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
    $(".load_hider").css('transform', 'translate(0, 0px)');
    $(".load_hider").css('opacity', '1.0');

});


function readyFn(jQuery) {


    jQuery('img').filter(function () {
        return this.src.match(/.*\.svg$/);
    }).each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        console.log(imgURL);

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
}


function removeStyles(el) {
    el.removeAttr('style');

    jQuery(el).find('g').each(function () {
        var $g = jQuery(this).find('g');
        console.log($g);
        $g.removeAttr('style');
    });

}