var Snake = function(dfRows, dfCols, dfSize, dfStartX, dfStartY) {
	/* ------- */
	/* DEFAULT */
	/* ------- */
	var qtRows = dfRows,
		qtCols = dfCols,
		qtSize = dfSize,
		qtCeed,
		startX = dfStartX,
		startY = dfStartY,
		dfDirection = 'right',
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


	var setSnake = function(x, y) {
		$('.cell[data-id="'+ x + '_' + y + '"]').addClass('snake');
	};

	var moveSnake = function(x, y) {
		var currentPosition = $('.snake').data('id');

		$('.cell[data-id="' + x + '_' + y +'"]').addClass('snake');

		if($('.cell[data-id="' + x + '_' + y +'"]').hasClass('snake')) {

			if($('.cell[data-id="' + x + '_' + y +'"]').hasClass('ceed')) {
				$('.cell[data-id="' + x + '_' + y +'"]').removeClass('ceed');
				qtCeed = qtCeed-1;
				$('#input__ceed').val(qtCeed);
			}

			setTimeout(function() {
				$('.cell[data-id="' + currentPosition +'"]').removeClass('snake');
			}, 50);
		} else {
			alert('BOOM!!!');
		}
	};

	var setDirection = function(direction) {
		var currentPosition = $('.snake').data('id'), 
			coordArray = currentPosition.split('_');

		dfDirection = direction;

		if(direction == 'right') {
			moveSnake(parseInt(coordArray[0])+1, parseInt(coordArray[1])+0);	
		} else if(direction == 'left') {
			moveSnake(parseInt(coordArray[0])-1, parseInt(coordArray[1])+0);	
		} else if(direction == 'up') {
			moveSnake(parseInt(coordArray[0])+0, parseInt(coordArray[1])-1);	
		} else if(direction == 'down') {
			moveSnake(parseInt(coordArray[0])+0, parseInt(coordArray[1])+1);
		}
	};

	var autoMove = function() {
		setInterval(function() {
			setDirection(dfDirection);
		}, 500);
	};

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var setCeed = function() {
		qtCeed = getRandomInt(1, (qtRows*qtCols)/5);
		$('#input__ceed').val(qtCeed);

		for (var i = 0; i < qtCeed; i++) {

			var ceedX = getRandomInt(0, qtCols-1),
				ceedY = getRandomInt(0, qtRows-1);
			
				console.log(ceedX + ' ' + ceedY);

			if((ceedX == dfStartX) && (ceedY == dfStartY)) {

			} else {
				$('.cell[data-id="' + ceedX + '_' + ceedY +'"]').addClass('ceed');	
			}

		};
	};


	/* ---- */
	/* INIT */
	/* ---- */
	var _init = function() {
		$('#input__rows').val(qtRows);
		$('#input__cols').val(qtCols);
		$('#input__size').val(qtSize);

		setField();
		setSnake(startX, startY);
		setCeed();
		// autoMove();
	};
	_init();

	/* -------- */
	/* HANDLERS */
	/* -------- */

	/* change quantity of cols rows and size of cells */
	/* ---------------------------------------------- */
	$('#input__rows, #input__cols, #input__size').on('change', function(){
		cstmRows = $('#input__rows').val();
		cstmCols = $('#input__cols').val();
		cstmSize = $('#input__size').val();

		if(cstmRows) {qtRows = cstmRows;}
		if(cstmCols) {qtCols = cstmCols;}
		if(cstmSize) {qtSize = cstmSize;}

		setField();
	});

	/* mouse events */
	/* ------------ */
	$('.cell').on('mouseenter', function() {
		$(this).addClass('active');
	}).on('mouseleave', function() {
		var crntCell = $(this).data('id');

		setTimeout(function() {
			$('.cell[data-id="' + crntCell + '"]').removeClass('active');
		}, 500);
	});

	/* keycode handlers */
	/* ---------------- */
	$(document).keydown(function(e) {
    	if(e.keyCode == 37) {
    		setDirection('left');
    	} else if (e.keyCode == 38) {
    		setDirection('up');
    	} else if (e.keyCode == 39) {
    		setDirection('right');
    	} else if (e.keyCode == 40) {
    		setDirection('down');
    	}
	});
};
















