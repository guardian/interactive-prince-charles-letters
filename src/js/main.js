define([
    'ractive',
    'ractive-transitions-slide',
    'get',
    'rvc!templates/appTemplate',
    'rvc!templates/shareTemplate',
    'rvc!templates/navTemplate',
    'rvc!templates/letterTemplate',
    'rvc!templates/rowTemplate',
    'rvc!templates/twitterTemplate'
], function(
    Ractive,
    RactiveSlide,
    get,
    AppTemplate,
    ShareTemplate,
    NavTemplate,
    LetterTemplate,
    RowTemplate,
    TwitterTemplate
) {
   'use strict';

    function init(el, context, config, mediator) {
        // DEBUG: What we get given on boot
        //console.log(el, context, config, mediator);
        //http://interactive.guim.co.uk/docsdata-test/1TexIb-OqXWcSEWG2uUJ0hx1b3RJyndXDfDjus0uaRsY.json'
        var url = 'http://interactive.guim.co.uk/docsdata-test/1H2Vw_WkKACcvsF3A1fgfmAqIoVGNNoTwPzYK7vWMcnc.json'
        get(url)
            .then(JSON.parse)
            .then(function(json){
           
                 var base = new AppTemplate({
                    el: el,
                    components: {
                        shareTemplate: ShareTemplate,
                        navTemplate: NavTemplate,
                        letterTemplate: LetterTemplate,
                        twitterTemplate: TwitterTemplate,
                        rowTemplate: RowTemplate
                    },
                    transitions: {
                        slide: RactiveSlide
                    }
                })

                base.on({
                    'navTemplate.scrollTo': function(e, id){
                        base.find('#letter-' + id).scrollIntoView();
                    }
                })
                
                base.set({
                    config: json.header,
                    letters: Object.keys(json.letters).map(function(k) { return json.letters[k] }),
                    windowWidth: window.innerWidth
                });

                //parse url for deep linking
                if(window.location.hash != ''){
                    var id = window.location.hash.replace('#letter', '');
                    base.find('#letter-' + id).scrollIntoView();
                }

                var footerEls = document.getElementsByClassName('l-footer');
                for(var i = 0; i < footerEls.length; i++){
                    footerEls[i].style.display = "block";
                }


            });

    }

    return {
        init: init
    };
});
