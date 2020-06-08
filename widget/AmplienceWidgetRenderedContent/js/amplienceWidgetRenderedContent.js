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
            amplienceCD1BaseURL: null,
            amplienceRenderedURL: null,

            onLoad: function(widget) {

                // Content Div ID
                var contentDivID = '#' + widget.typeId() + "-" + widget.id() + "-Content";
                                
                // Getting Amplience Settings from Site Settings
                widget.amplienceCD1BaseURL = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceCD1BaseURL'];

                // Building the Render URL
                if ( widget.amplienceContentID() && widget.amplienceTemplateName() )
                    widget.amplienceRenderedURL = 
                        widget.amplienceCD1BaseURL 
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
                        cache:false,
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