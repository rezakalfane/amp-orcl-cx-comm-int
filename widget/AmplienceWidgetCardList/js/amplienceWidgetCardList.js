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
            amplienceBaseURL: null,
            amplienceContentURL: null,
            amplienceCardImageURLs: ko.observable([]),

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
                    $.getJSON(widget.amplienceContentURL, {"depth": "all", "format": "inlined"}) 
                        .success(
                            function(data) { 
                                
                                // Set loading to false
                                widget.isLoading(false);
                                
                                // Logging
                                console.log("Amplience Content Data: ");
                                console.log(data.content);
                                
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
                                
                                widget.amplienceCardImageURLs(listURLs);
                                
                                // Retrieve content
                                widget.content(data.content); 

                                console.log(widget.amplienceCardImageURLs());
                            }
                        )
                }
                widget.isLoading(false);
            }
        }
    }
);