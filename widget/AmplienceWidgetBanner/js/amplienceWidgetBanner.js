define(
    //-------------------------------------------------------------------
    // AMPLIENCE WIDGET - BANNER
    //-------------------------------------------------------------------

    //-------------------------------------------------------------------
    // DEPENDENCIES
    //-------------------------------------------------------------------
    ['knockout', 'jquery'],

    //-------------------------------------------------------------------
    // MODULE DEFINITION
    //-------------------------------------------------------------------
    function(ko, $) {

        "use strict";

        return {
            content: ko.observable(),
            isLoading: ko.observable(true),
            imageURL: ko.observable(),
            amplienceBaseURL: null,
            amplienceContentURL: null,
            calculateImageURL: function(image) { 
                return "https://" + image.defaultHost + "/i/" + image.endpoint + "/" + image.name;
            },
            onLoad: function(widget) {

                // Site setting
                widget.amplienceBaseURL = "https://oraclecx.cdn.content.amplience.net/content";
                widget.amplienceContentURL = widget.amplienceBaseURL + "/key/" + widget.amplienceContentKey();
                
                // Load data
                $.getJSON(widget.amplienceContentURL) 
                    .success(function(data) { 
                        widget.isLoading(false);
                        widget.content(data.content); 
                        widget.imageURL(widget.calculateImageURL(data.content.img.image));
                });
            },
            beforeAppear: function(widget) {
                
                // Load data
                $.getJSON(widget.amplienceContentURL) 
                    .success(function(data) { 
                        widget.isLoading(false);
                        widget.content(data.content); 
                        widget.imageURL(widget.calculateImageURL(data.content.img.image));
                });
            }
           
        }
    }
);