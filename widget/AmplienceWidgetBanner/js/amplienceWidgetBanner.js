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
            contentSchema: "https://www.amplience.com/examples/banner.json",
            content: ko.observable(),
            isLoading: ko.observable(true),
            amplienceCD1BaseURL: null,
            amplienceContentURL: null,

            onLoad: function(widget) {

                // Getting Amplience Settings from Site Settings
                widget.amplienceCD1BaseURL = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceCD1BaseURL'];
                if (widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaBanner'])
                    widget.contentSchema = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaBanner'];
                
                // Building the Content URL
                if ( widget.amplienceContentKey() )
                    widget.amplienceContentURL = widget.amplienceCD1BaseURL + "/key/" + widget.amplienceContentKey();
                else if ( widget.amplienceContentID() )
                    widget.amplienceContentURL = widget.amplienceCD1BaseURL + "/id/" + widget.amplienceContentID();

                // Logging
                console.log( "Amplience Content URL: " + widget.amplienceContentURL );

                // Retrieve content if content URL is defined
                if ( widget.amplienceContentURL )
                {
                    // Load data
                    $.getJSON(widget.amplienceContentURL, {"depth": "all", "format": "inlined"}) 
                        .success(
                            function(data) { 
                                
                                // Set loading to false
                                widget.isLoading(false);

                                // Logging
                                console.log( "Amplience Content Data: " );
                                console.log( data.content );
                                
                                // Checking if content schema is the one expected
                                var checkContentSchema = data.content._meta.schema;
                                console.log(checkContentSchema);
                                console.log(widget.contentSchema);

                                if (checkContentSchema == widget.contentSchema)
                                {
                                    // Retrieve content
                                    widget.content(data.content); 
                                }
                                else
                                {
                                    // Wrong content schema
                                    console.log("Wrong schema " + checkContentSchema + ", was expecting " + widget.contentSchema);
                                }
                            }
                        )
                }
                widget.isLoading(false);
            }
        }
    }
);