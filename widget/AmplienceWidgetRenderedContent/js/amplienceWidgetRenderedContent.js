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

                // Building the Render URL - TODO: handle locale
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
                        cache:false,    // will add a "_" parameter with current timestamp
                        context: document.body})
                    .done(function(data, textStatus, xhr) {

                        // Return code should be code 200
                        console.log("Rendering service response: " + xhr.status + " - " + textStatus);

                        // Set loading to false
                        widget.isLoading(false);
                        
                        if ( xhr.status == 200 )
                        {
                            // Replace instance DIV with returned HTML
                            $(contentDivID).html(data);
                        }
                    })
                    .fail(function(data, textStatus, xhr) {
                        
                        // Issue with the template or the rendering engine
                        console.log("Rendering service response: " + xhr + " - " + textStatus);
                        
                        // Set loading to false
                        widget.isLoading(false);
                    });
                }
                widget.isLoading(false);
            }
        }
    }
);