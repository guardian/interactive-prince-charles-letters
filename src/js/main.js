define([
    'ractive',
    'get',
    'rvc!templates/appTemplate',
    'rvc!templates/shareTemplate',
    'rvc!templates/navTemplate',
    'rvc!templates/LetterTemplate',
    'rvc!templates/twitterTemplate',
    'json!data/letters.json'
], function(
    Ractive,
    get,
    AppTemplate,
    ShareTemplate,
    NavTemplate,
    LetterTemplate,
    TwitterTemplate,
    data
) {
   'use strict';

    function init(el, context, config, mediator) {
        // DEBUG: What we get given on boot
        //console.log(el, context, config, mediator);
        console.log(data)
        var base = new AppTemplate({
            el: el,
            components: {
                shareTemplate: ShareTemplate,
                navTemplate: NavTemplate,
                letterTemplate: LetterTemplate,
                twitterTemplate: TwitterTemplate
            }
        })

        base.on('navTemplate.scrollTo', function(e, id){
            base.find('#letter-' + id).scrollIntoView();
        })

        base.set('config', data.header);       
        base.set('letters', Object.keys(data.letters).map(function(k) { return data.letters[k] }) );
        

        // var SPREADSHEET_KEY = '1wtPiBdw2T5VGOIpWsXWxPsnCDrsE3hAsJ2H9LdG-G0A';
        // get('http://interactive.guim.co.uk/spreadsheetdata/'+SPREADSHEET_KEY+'.json')
        //     .then(JSON.parse)
        //     .then(function(json){

                
        //         base.set('config', json.sheets.config[0]);       
        //         base.set('letters', json.sheets.letters);
        //         base.set('annotations', json.sheets.annotations);
                
        //         //parse url for deep linking
        //         if(window.location.hash != ''){
        //             var id = window.location.hash.replace('#letter', '');
        //             base.find('#letter-' + id).scrollIntoView();
        //         }


        //     });

    }

    return {
        init: init
    };
});
