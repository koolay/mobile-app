'use strict';

module.exports = [
    function () {

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                if ( !attrs.href ){
                    return;
                }
                var externalRe = new RegExp("^(http|https)://");
                var url = attrs.href;

                if(externalRe.test(url)) {
                    element.on('click',function(e){
                        e.preventDefault();
                        if(attrs.ngClick){
                            scope.$eval(attrs.ngClick);
                        }
                        window.open(encodeURI(url), '_system');
                    });
                }
            }
        };
    }
];
