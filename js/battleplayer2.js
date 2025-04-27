$(document).ready(() => {
    // console.log('battleplayer2')

    $('[data-toggle="tooltip"]').tooltip();

	$('#btnBattle').click(function () {
		if(started) {
			showBattleText();
		}
	});
	
    $('#btnPause').click(function () {
        if (started) {
            PAUSE = !PAUSE;
            if (PAUSE) {
                $(this).removeClass('mdl-button--colored');
                $(this).addClass('mdl-button--accent');
            } else {
                $(this).addClass('mdl-button--colored');
                $(this).removeClass('mdl-button--accent');
            }
        }
    });

	$('#btnFleet').click(function () {
		if (started) {
            SHOW = !SHOW;
            if (SHOW) {
                $(this).removeClass('mdl-button--colored');
                $(this).addClass('mdl-button--accent');
                $(this).text('Hide Fleet Details');
                loadFleetInfo(API);
            } else {
                $(this).addClass('mdl-button--colored');
                $(this).removeClass('mdl-button--accent');
                $(this).text('Show Fleet Details');
                clearTables();
            }
        }
	});
	
    $('#btnReset').click(function () {
        if (started)
            reset(function () {
                processAPI(API);
            });
    });

    $('#rangeSpeed').on('input', function () {
        var num = $(this).val();
        localStorage.setItem('rangeSpeed', num)
        RATE = (num < 40) ? num / 40 : (num - 40) / 10 + 1;
        $('#speednum').text('x' + RATE);
    });

    $('#switchSound').change(function () {
        if (!Howler._muted) {
            $(this).attr('checked', false);
            localStorage.setItem('switchSound', false);
            Howler.mute(true);
        } else {
            $(this).attr('checked', true);
            localStorage.setItem('switchSound', true);
            Howler.mute(false);
            Howler.volume($('#rangeVolume').val() / 100);
            localStorage.setItem('rangeVolume', $('#rangeVolume').val());
        }
    });

    $('#rangeVolume').on('input', function () {
        var num = $(this).val();
        localStorage.setItem('rangeVolume', num)
        num = num / 100;
        if (!Howler._muted)
            Howler.volume(num);
    });
	
	$('#btnImportSim').click(function() {
		let code = $('#code').val();
		if (!code) return;
		window.open('simulator.html#'+code,'_blank');
	});
    
    let val;
    if((val = localStorage.getItem('rangeSpeed')) != null) {
        val = parseInt(val);
        $('#rangeSpeed').val(val);
        RATE = (val < 40) ? val / 40 : (val - 40) / 10 + 1;
        $('#speednum').text('x' + RATE);
    }

    if((val = localStorage.getItem('switchSound')) != null) {
        val = val === 'true';
        $('#switchSound').prop('checked', val);
        Howler.mute(!val);
    }

    if((val = localStorage.getItem('chkvoice')) != null) {
        val = val === 'true';
        $('#chkvoice').prop('checked', val);

        var SM = new SoundManager();
        if(val) {
            SM.turnOnVoice();
        }
        else {
            SM.turnOffVoice();
        }
    }

    if((val = localStorage.getItem('rangeVolume')) != null) {
        val = parseInt(val);
        $('#rangeVolume').val(val);
        if (!Howler._muted)
            Howler.volume(val / 100);
    }
})