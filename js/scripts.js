var Snake = function(dfRows, dfCols, dfSize) {
	/* ------- */
	/* DEFAULT */
	/* ------- */
	var qtRows = dfRows,
		qtCols = dfCols,
		qtSize = dfSize,
		cstmRows,
		cstmCols,
		cstmSize;

	var drawRow = function(i) {
		$('.field').append('<div class="row" data-id="r-' + i + '"></div>');
	};
	var drawCell = function(i, j) {
		$('.row[data-id="r-' + i + '"]').append('<div class="cell" data-id="' + j + '_' + i + '"></div>');
	};
	var setGrid = function(rows, cols, size) {
		for (var i = 0; i < rows; i++) {
			drawRow(i);
			for (var j = 0; j < cols; j++) {
				drawCell(i, j);
			}
		};

		$('.field').css({'width': size*cols, 'height': size*rows})
		$('.row').css('height', size);
		$('.cell').css({'width': size, 'height': size});
	};
	var setField = function() {
		$('.field').empty();

		setGrid(qtRows, qtCols, qtSize);
	};

	/* ---- */
	/* INIT */
	/* ---- */
	var _init = function() {
		$('#input__rows').val(qtRows);
		$('#input__cols').val(qtCols);
		$('#input__size').val(qtSize);

		setField();	
	};
	_init();

	/* -------- */
	/* HANDLERS */
	/* -------- */
	$('#input__rows, #input__cols, #input__size').on('change', function(){
		cstmRows = $('#input__rows').val();
		cstmCols = $('#input__cols').val();
		cstmSize = $('#input__size').val();

		if(cstmRows) {qtRows = cstmRows;}
		if(cstmCols) {qtCols = cstmCols;}
		if(cstmSize) {qtSize = cstmSize;}

		setField();
	});

	$('.cell').on('mouseenter', function() {
		$(this).addClass('active');
	}).on('mouseleave', function() {
		var crntCell = $(this).data('id');

		setTimeout(function() {
			$('.cell[data-id="' + crntCell + '"]').removeClass('active');
		}, 500);
	});
};
















