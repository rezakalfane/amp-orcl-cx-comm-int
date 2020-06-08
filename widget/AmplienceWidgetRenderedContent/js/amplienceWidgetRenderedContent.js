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
            amplienceBaseURL: null,
            amplienceRenderedURL: null,

            onLoad: function(widget) {

                // Content Div ID
                var contentDivID = '#' + widget.typeId() + "-" + widget.id() + "-Content";
                
                var amplienceStoreName = "oraclecx";
                
                // Getting Amplience Settings from Site Settings
                widget.amplienceBaseURL = "https://c1.adis.ws/v1/content";

                // Building the Render URL
                if ( widget.amplienceContentID() && widget.amplienceTemplateName() )
                    widget.amplienceRenderedURL = 
                        widget.amplienceBaseURL 
                        + "/" 
                        + amplienceStoreName
                        + "/content-item/" 
                        + widget.amplienceContentID()
                        + "?template=" 
                        + widget.amplienceTemplateName()
                        + "&locale=en-GB,en*,*";

                // Logging
                console.log( "Amplience Rendered URL: " + widget.amplienceRenderedURL );

                // Retrieve content if content URL is defined
                if ( widget.amplienceRenderedURL )
                {
                    // Load data
                    $.ajax({
                        url: widget.amplienceRenderedURL,
                        context: document.body
                    }).done(function(response) {
                        
                        // Set loading to false
                        widget.isLoading(false);
                        $(contentDivID).html(response);
                    });
                }
                widget.isLoading(false);
            }
        }
    }
);