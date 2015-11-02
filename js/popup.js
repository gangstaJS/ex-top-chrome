!function() {
	'use strict';

	var spiner = $('.spin-wrapper'), out = null;

	topInit();

	// --

	$('.menu > span').on('click', function() {
		var topUri = parseInt($(this).data('uri'));

		if(topUri) {
			topUri = '/'+topUri
			topInit(topUri);
		} else {
			topUri = '';
			topInit();
		}

		$('.menu > span').removeClass('active');
		$(this).addClass('active');

		$('.full').attr('href', 'http://ex.ua/top'+topUri);

	});

	// --

	function topInit(top) {
		clearTimeout(out);

		var list = $('#list').empty();
		spiner.show();

		if(!top) top = '';
		
		$.ajax({
			url: 'http://www.ex.ua/r_top' + top,
			data: {per: 14},
			dataType: 'text',
			success: function(res) {
				var dataList = res.split('\n'),
				 	arr = [];
	
				each(dataList, function(el,n) {
					if(!el.trim().length) return;
	
					var data = el.split(',');
	
					var id = data[1];
	
					data.shift();
					data.shift();
	
					var title = data.join(',');
	
					var a = $('<a>', {
						target: '_blank',
						'class': 'list-item',
						text: title,
						title: title,
						href: 'http://ex.ua/'+id
					});
	
					arr.push($('<li>').append(a));
	
				});

				out = setTimeout(function() {
					spiner.hide();	
					list.append(arr);
				}, 500)
			}
		});
	}

	// --

	function each(obj, iterator, context) {
	  if (obj == null) return obj;
	  if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
	    obj.forEach(iterator, context);
	  } else if (obj.length === +obj.length) {
	    for (var i = 0, length = obj.length; i < length; i++) {
	      if (iterator.call(context, obj[i], i, obj) === breaker) return;
	    }
	  } else {
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
	    }
	  }
	  return obj;
	};

}();