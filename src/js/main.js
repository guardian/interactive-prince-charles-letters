define([
    'ractive',
    'get',
    'rvc!templates/appTemplate',
    'rvc!templates/shareTemplate',
    'rvc!templates/navTemplate',
    'rvc!templates/LetterTemplate'
], function(
    Ractive,
    get,
    AppTemplate,
    ShareTemplate,
    NavTemplate,
    LetterTemplate
) {
   'use strict';

    function init(el, context, config, mediator) {
        // DEBUG: What we get given on boot
        console.log(el, context, config, mediator);

        var base = new AppTemplate({
            el: el,
            components: {
                shareTemplate: ShareTemplate,
                navTemplate: NavTemplate,
                letterTemplate: LetterTemplate
            }
        })

        var SPREADSHEET_KEY = '1wtPiBdw2T5VGOIpWsXWxPsnCDrsE3hAsJ2H9LdG-G0A';
        get('http://interactive.guim.co.uk/spreadsheetdata/'+SPREADSHEET_KEY+'.json')
            .then(JSON.parse)
            .then(function(json){

                        
                base.set('letters', json.sheets.letters);
                base.set('annotations', json.sheets.annotations);
                console.log(json.sheets)
            });

    }

    return {
        init: init
    };
});
