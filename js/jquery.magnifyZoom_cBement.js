;(function($, window, undefined) {

    'use strict';

    var Modernizr = window.Modernizr;

    //Constructor function definition for our new QTRotator object
    $.MagnifyZoom = function (options, element) {

        this.$imageContainer = $(element);
        this._init(options);
    };

    //Set up default options
    $.MagnifyZoom.defaults = {
        width: 300,
        height: 300,
        cornerRounding: '50%'
    };

    //Create methods for new object
    $.MagnifyZoom.prototype = {
        _init: function (options) {

            var imageObject = new Image();
            imageObject.src = $('.small').attr('src');

            //set up properties for new object
            this.options = $.extend($.MagnifyZoom.defaults, options);
            this.nativeWidth = imageObject.width;
            this.nativeHeight = imageObject.height;
            this.$glass = $('.large');
            this.$smallImage = $('.small');

            //call this objects _getLocation() methods
            this._getLocation();


        },
        _getLocation: function (){




            self = this;
            this.$imageContainer.mousemove(function (e) {

                //Wrap the object the mouse move occurred on in a jQuery object

               var $target = $(this);

                // get the coordinates of div.magnify relative to the edges of the page (document)
                var magnifyOffset = $target.offset();

                var mouseX;
                var mouseY;

                //Subtract the top and left offset values to get our mouse's location relative to the edges of div.magnify
                self.mouseX = e.pageX - magnifyOffset.left;
                self.mouseY = e.pageY - magnifyOffset.top;

                self._zoom($target);
            })
        },


        _zoom: function ($target) {
            //fade in the magnifying glass ($glass property) if the mouse cursor is inside div.magnify
            // and fade it out when the mouse leaves div.magnify.
            //$glass = $('.large');

            if (this.mouseX > 0 && this.mouseX < $target.width() && this.mouseY > 0 && this.mouseY < $target.height()){
                this.$glass.fadeIn(100);

            }else { //mouse cursor not in div.magnify
                this.$glass.fadeOut(100);
            }

            if(this.$glass.is(":visible")) {
                //perform calculations to zoom to the correct portion of the large image within the glass, and move the mouse cursor as it moves.
                var glassWidth = this.$glass.width(),
                    glassHeight = this.$glass.height(),
                    halfGlassWidth = glassWidth / 2,
                    halfGlassHeight = glassHeight / 2,

                    //Determine the x and y position values for the background image of your magnifying glass
                    // storing them in variables rx and ry respectively.
                    rx = Math.round(this.mouseX / this.$smallImage.width() * this.nativeWidth - halfGlassWidth) * -1,
                    ry = Math.round(this.mouseY / this.$smallImage.height() * this.nativeHeight - halfGlassHeight) * -1,

                //Determine the left and top positioning values you will use for your magnifying
                // glass storing them in variables posX and posY respectively.
                    posX = this.mouseX - halfGlassWidth,
                    posY = this.mouseY - halfGlassHeight;

                //Use jQuery’s css() method to apply the new values you have to the magnifying glass and its background.
                this.$glass.css({
                    width: $.MagnifyZoom.defaults.options,
                    height: $.MagnifyZoom.defaults.options,
                    borderRadius: $.MagnifyZoom.defaults.options,
                    top: posY,
                    left: posX,
                    backgroundPosition: rx + 'px ' + ry + 'px'
                })
            }


        }
        },



    $.fn.magnifyZoom = function (options) {



        if (typeof options === 'string') {

            // not as common, leave off code for now...

        }
        else {  // options !== 'string', usually meaning it is an object

            // here, this refers the jQuery object that was used
            // to call this plugin method ($('#quoteRotator'))
            this.each(function() {

                //here, inside of each() function, this refers to div#quoteRotator
                var instance = $.data(this, 'qtRotator');

                if (instance) {
                    instance._init();
                }
                else {

                    instance = $.data(this, 'qtRotator', new $.MagnifyZoom(options, this));

                }

            });

        }

        return this; // make our plugin method chainable

    };

})(jQuery, window);