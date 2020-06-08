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
            contentSchema: "https://www.amplience.com/examples/cardList.json",
            content: ko.observable(),
            isLoading: ko.observable(true),
            amplienceCardListClass: ko.observable("amp-ca-card-list amp-ca-prod-3-rows"),
            amplienceCD2BaseURL: null,
            amplienceContentURL: null,

            onLoad: function(widget) {

                // Getting Amplience Settings from Site Settings
                widget.amplienceCD2BaseURL = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceCD2BaseURL'];
                if (widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaCardList'])
                    widget.contentSchema = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaCardList'];

                // Building the Content URL
                if ( widget.amplienceContentKey() )
                    widget.amplienceContentURL = widget.amplienceCD2BaseURL + "/key/" + widget.amplienceContentKey();
                else if ( widget.amplienceContentID() )
                    widget.amplienceContentURL = widget.amplienceCD2BaseURL + "/id/" + widget.amplienceContentID();

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
                                console.log("Amplience Content Data: ");
                                console.log(data.content);

                                // Checking if content schema is the one expected
                                var checkContentSchema = data.content._meta.schema;
                                console.log(checkContentSchema);
                                console.log(widget.contentSchema);

                                if (checkContentSchema == widget.contentSchema)
                                {                   
                                    // Assigning the right class
                                    if ( data.content.cards.length < 6 )
                                        widget.amplienceCardListClass("amp-ca-card-list amp-ca-prod-" + data.content.cards.length + "-rows");

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