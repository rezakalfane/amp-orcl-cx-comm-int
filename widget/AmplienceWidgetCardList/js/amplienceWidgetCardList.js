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
            amplienceBaseURL: null,
            amplienceContentURL: null,
            amplienceCardImageURLs: ko.observable([]),

            onLoad: function(widget) {

                // Getting Amplience Settings from Site Settings
                widget.amplienceBaseURL = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceBaseURL'];
                if (widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaCardList'])
                    widget.contentSchema = widget.site().extensionSiteSettings['amplience-site-settings']['amplienceContentSchemaCardList'];

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
                                console.log("Amplience Content Data: ");
                                console.log(data.content);

                                var checkContentSchema = data.content._meta.schema;
                                console.log(checkContentSchema);
                                console.log(contentSchema);

                                if (checkContentSchema == widget.contentSchema)
                                {
                                    var listURLs = [];
                                    
                                    // Cycle through cards
                                    for ( var cardRef in data.content.cards )
                                    {
                                        var card = data.content.cards[cardRef];
                                        console.log(card);
                                        listURLs.push(
                                            "https://"
                                            + card.image.image.defaultHost
                                            + "/i/"
                                            + card.image.image.endpoint
                                            + "/"
                                            + card.image.image.name
                                        );
                                    }
                                    
                                    widget.amplienceCardListClass("amp-ca-card-list amp-ca-prod-" + listURLs.length + "-rows");
                                    widget.amplienceCardImageURLs(listURLs);
                                    
                                    // Retrieve content
                                    widget.content(data.content); 

                                    console.log(widget.amplienceCardImageURLs());
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