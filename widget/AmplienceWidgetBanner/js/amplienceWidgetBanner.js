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
            contentData: ko.observable( {} ),

            onLoad: function(widget) {
                var amplienceContentID = widget.amplienceContentID();
                var amplienceContentKey = widget.amplienceContentKey();

                var amplienceBaseURL = "https://oraclecx.cdn.content.amplience.net/content/key/web/hero/banner";

                // Load data
                $.getJSON(amplienceBaseURL) 
                    .success(function (data) {
                        self.contentData(data);
                    });
            }
        }
    }
);
                
