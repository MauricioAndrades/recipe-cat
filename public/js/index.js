
/**
  This function bootstraps the spotify request functionality.
*/
function recipeStart() {
    // var divPlaceholder = $('#q-results');
    // .on( events [, selector ] [, data ], handler )
    $('#recipe-q-button').on('click', function() {
        console.log('ajax begins');
        /** get value of searchfield */
        // var params = $('#recipe-q').val();
        var params = {
            ingredients: "apples" || $('#recipe-q').val()
        }
        $.ajax({
            async: true,
            method: "GET",
            url: "/ingredients",
            data: params,
        })
        .done(function( data ) {
            console.log( "Data Saved: " + data );
            localStorage.setItem('dataObj', JSON.stringify(data));
        })
        .fail(function( data) {
            console.log("data failed");
        });
    });
}

/**
 * [parseinit description]
 * @param  {json} obj [description]
 * @param  {string} key [description]
 * @param  {string} el  [description]
 * @return {none}     [description]
 */


var bgColor;
var effect = 'animated bounceInLeft';

function responsive() {

    /* bounceIn, bounceInUp, bounceInDown, bounceInLeft,
    rotateInUpRight, rotateInDownRight  */
    $('.all-content').hide();
    $('.content li').click(function(){
        $('.card-front, .card-back').hide();
        $('.content li').removeClass('active').hide().css('border','none');
        $(this).addClass('active').show();
        bgColor = $('.active .card-back').css('background-color');
        $('.content').css('background-color',bgColor);
        $('.close, .all-content').show();
        $('.responsive').append('<span class="close">close</span>').addClass(effect);
    });
    $('.responsive').on('click', '.close', function(){
        $('.close').remove();
        bgColor = $('.active .card-front').css('background-color');
        $('.responsive').removeClass(effect);
        $('.all-content').hide();
        $('.content li').removeClass('active').show().css({ 'border-bottom':'1px solid #2c2c2c',
                                                            'border-left':'1px solid #2c2c2c' });
        $('.card-front, .card-back').show();
        $('.content').css('background-color',bgColor);
    });
}

function testajaxonload() {
	    console.log('ajax begins');
	    /** get value of searchfield */
	    // var params = $('#recipe-q').val();
	    var params = {
	        ingredients: "apples"
	    }
	    $.ajax({
	        async: true,
	        method: "GET",
	        url: "/ingredients",
	        data: params,
	    })
	    .done(function( data ) {
	        console.log( "Data Saved: " + data );
	        localStorage.setItem('resapi', JSON.stringify(data))
	    }).then(function ( data ) {
	    		var apidata = localStorage.getItem('resapi');
	    		console.log(apidata);
	    		console.log(typeof apidata);
	    		var dt = $.parseJSON(apidata);

	    		function parseinit(obj, key, el) {
	    			for (var i = 0; i < obj.data.length; i++) {
	    				$(el).data(key,obj);
	    				console.log(obj.data[i].key);
	    			}
	    		}

	    		function setid(){
	    			$("b").each(function(i){
	    			    this.id = dt.data[0].id;
	    			})
	    		}

	    		$('div.card-front > h2 > b').data('hello');
    	})
	    .fail(function( data) {
	        console.log("data failed");
	    });
}


(function() {
    $(window).ready(function() {
		responsive();
        recipeStart();
        $("body").removeClass("preload");
        testajaxonload();
    });
})();
