define(
    //-------------------------------------------------------------------
    // AMPLIENCE WIDGET - CARD LIST
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

            onLoad: function(widget) {

                // Getting Amplience Base URL from site setting
                widget.amplienceBaseURL = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceBaseURL'];
                
                // Building the Content URL
                if ( widget.amplienceContentKey() )
                    widget.amplienceContentURL = widget.amplienceBaseURL + "/key/" + widget.amplienceContentKey();
                else if ( widget.amplienceContentID() )
                    widget.amplienceContentURL = widget.amplienceBaseURL + "/id/" + widget.amplienceContentID();

                // Logging
                console.log( "Amplience Content URL: " + widget.amplienceContentURL );

                // Retrieve content if content URL is defined
                if ( widget.amplienceContentURL )
                {
                    // Load data
                    $.getJSON(widget.amplienceContentURL, {"depth": "all", "format": "inline"}) 
                        .success(
                            function(data) { 
                                
                                // Set loading to false
                                widget.isLoading(false);
                                
                                // Retrieve content
                                widget.content(data.content); 
                                
                                // Logging
                                console.log( "Amplience Content Data: " );
                                console.log( data.content );
                                
                                // Build banner image URL
                                widget.imageURL(
                                    "https://" 
                                    + data.content.img.image.defaultHost 
                                    + "/i/" 
                                    + data.content.img.image.endpoint 
                                    + "/" 
                                    + data.content.img.image.name);
                            }
                        )
                }
                widget.isLoading(false);
            }
        }
    }
);