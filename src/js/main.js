define([
    'ractive',
    'get',
    'rvc!templates/appTemplate',
    'rvc!templates/shareTemplate',
    'rvc!templates/navTemplate',
    'rvc!templates/LetterTemplate',
    'rvc!templates/twitterTemplate'
], function(
    Ractive,
    get,
    AppTemplate,
    ShareTemplate,
    NavTemplate,
    LetterTemplate,
    TwitterTemplate
) {
   'use strict';

    function init(el, context, config, mediator) {
        // DEBUG: What we get given on boot
        //console.log(el, context, config, mediator);

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
            console.log()
            base.find('#letter-' + id).scrollIntoView();
        })

        //base.set('config', data.header);       
        
        


        get('http://interactive.guim.co.uk/docsdata-test/1TexIb-OqXWcSEWG2uUJ0hx1b3RJyndXDfDjus0uaRsY.json')
            .then(JSON.parse)
            .then(function(json){
                
                base.set('config', json.header);  
                base.set('letters', Object.keys(json.letters).map(function(k) { return json.letters[k] }) );

                //parse url for deep linking
                if(window.location.hash != ''){
                    var id = window.location.hash.replace('#letter', '');
                    base.find('#letter-' + id).scrollIntoView();
                }


            });

    }

    return {
        init: init
    };
});
