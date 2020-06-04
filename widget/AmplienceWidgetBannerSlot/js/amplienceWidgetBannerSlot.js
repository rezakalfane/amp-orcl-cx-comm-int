define(
    //-------------------------------------------------------------------
    // AMPLIENCE WIDGET - BANNER SLOT
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
            contentSchema: "https://www.amplience.com/examples/slots/banner-slot.json",
            content: ko.observable(),
            isLoading: ko.observable(true),
            imageURL: ko.observable(),
            amplienceBaseURL: null,
            amplienceContentURL: null,

            onLoad: function(widget) {

                // Getting Amplience Settings from Site Settings
                widget.amplienceBaseURL = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceBaseURL'];
                if (widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaBannerSlot'])
                    widget.contentSchema = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaBannerSlot'];
                
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
                    $.getJSON(widget.amplienceContentURL, {"depth": "all", "format": "inlined"})  
                        .success(
                            function(data) { 
                                
                                // Set loading to false
                                widget.isLoading(false);

                                // Logging
                                console.log( "Amplience Content Data: " );
                                console.log( data.content );
                                
                                var checkContentSchema = data.content._meta.schema;
                                console.log(checkContentSchema);
                                console.log(widget.contentSchema);

                                if (checkContentSchema == widget.contentSchema)
                                {

                                    // Build banner image URL
                                    widget.imageURL(
                                        "https://" 
                                        + data.content.img.image.defaultHost 
                                        + "/i/" 
                                        + data.content.img.image.endpoint 
                                        + "/" 
                                        + data.content.img.image.name);
                                          
                                        
                                    console.log(widget.imageURL());

                                    // Retrieve content
                                    widget.content(data.content); 
                                }
                                else
                                {
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