$(document).ready(function(){
	//Pegamos o valor selecionado default no select id="qtd"
	var mostrar_por_pagina = 1;

	//quantidade de divs
	var numero_de_itens = $('#form').children('.passo').size();

	//fazemos uma calculo simples para saber quantas paginas existiram
	var numero_de_paginas = Math.ceil(numero_de_itens / mostrar_por_pagina)

	//Colocamos a div class controls dentro da div id pagi
	$('#pagi').append('<div class="controls"></div>\
		<input type="hidden" id="current_page"><input type="hidden" id="mostrar_por_pagina">');
	$('#current_page').val(0);
	$('#mostrar_por_pagina').val(mostrar_por_pagina);

	//Criamos os links de navegação
	var nevagacao = '<li onclick="anterior()"><a class="prev">Anterior</a></li>';
	var link_atual = 0;
	while (numero_de_paginas > link_atual) {
		nevagacao +=
		// '<li class="page" onclick="ir_para_pagina(' +
		// link_atual +
		// ')" longdesc="' +
		// link_atual +
		// '"><span>' +
		// (link_atual + 1) +
		// "</span></li>";
		// link_atual++;
		'<li class="page"' +
		' longdesc="' +
		link_atual +
		'"><span>' +
		(link_atual + 1) +
		"</span></li>";
		link_atual++;
	}
	nevagacao += '<li class="bt_next" onclick="proxima()"><a class="next">Próxima</a></li><li class="bt_enviar"><input type="submit" class="btn_enviar" valeu="Enviar"></li>';

	//colocamos a nevegação dentro da div class controls
	$('.controls').html('<div class="paginacao">\
		<ul class="pagination">'+nevagacao+'</ul></div>');

	//atribuimos ao primeiro link a class active
	$('.controls .page:first').addClass('active');
	$('#form').children().hide();
	$('#form').children().slice(0, mostrar_por_pagina).fadeIn('100');


	// Altera imagem do genero do rosto
	$('.form .gender').on('click', function() {
	    var genero = $('.form .gender:checked').val();

		$('#rosto').removeClass();
		$('#rosto').addClass(genero);
	});

	$('.input').on("focus", function(){
		if($(this).val()==''){
			$(this).parent().toggleClass('input-focused');
		}else{
			$(this).parent().toggleClass('input-has-value');
		}
	});

	$('.input').on("blur", function(){
		if($(this).val()==''){
			$(this).parent().toggleClass('input-focused');
		}else{
			$(this).parent().toggleClass('input-has-value');
		}
	});


	// Troca cards em exibição
    // $('.tab-link').click(function() {
    //     var index = $(this).parent().index();
    //     $('.cards-container').parent().fadeOut();
    //     $('.cards-container').eq(index).parent().fadeIn('fast');

    //     $('.nav_tab-item').removeClass('active');
    //     $(this).parent().addClass('active');
    //     return false
    // });


    // VALIDA FORMULARIO
    $('#form').validate({
        rules: {
            nome: "required",
            email: {required:true, email:true}
        },
        messages: {
            nome: " ",
            email: {required:" ", email:" "}
        },
        submitHandler: function (){
            var nome = $('#form .nome').val();
            var email = $('#form .email').val();
            $.ajax({
                // url: "https://docs.google.com/forms/d/1kr7oio7_Q696f7q1Wd--nDpG9Od8zm-dGfyUWT-WJd0/formResponse",
                url: "https://docs.google.com/forms/d/e/1FAIpQLSdLGLRKBzrdktz4ASoSudlWEMyAsQFFnB8qm7Meq3UoDH0zpQ/formResponse",
                data: {"entry.385834645" : nome, "entry.1989384119" : email},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
                        $('#form .nome').val("");
                        $('#form .email').val("");
                        // $('#inline_content h3, #inline_content .wpcf7-form .form1, #inline_content .wpcf7-form p').hide();
                    },
                    200: function (){
                        $('#form .nome').val("");
                        $('#form .email').val("");
                        // $('#inline_content h3, #inline_content .wpcf7-form .form1, #inline_content .wpcf7-form p').hide();
                    }
                }
            });
        }
	});
});


function ir_para_pagina(numero_da_pagina) {
    //Pegamos o número de itens definidos que seria exibido por página
    var mostrar_por_pagina = parseInt($('#mostrar_por_pagina').val(), 0);

    //pegamos  o número de elementos por onde começar a fatia
    inicia = numero_da_pagina * mostrar_por_pagina;

    //o número do elemento onde terminar a fatia
    end_on = inicia + mostrar_por_pagina;
    $('#form').children().hide().slice(inicia, end_on).fadeIn('100');
    $('.page[longdesc=' + numero_da_pagina+ ']').addClass('active').siblings('.active').removeClass('active');
    $('#current_page').val(numero_da_pagina);
}

function anterior(nova_pagina) {
    nova_pagina = parseInt($('#current_page').val(), 0) - 1;

    //se houver um item antes do link ativo atual executar a função
    if ($('.active').prev('.page').length == true) {
        ir_para_pagina(nova_pagina);
    }
}

function proxima(nova_pagina) {
    nova_pagina = parseInt($('#current_page').val(), 0) + 1;

    //se houver um item após o link ativo atual executar a função
    if ($('.active').next('.page').length == true) {
        if ($('.page.active[longdesc="5"]') == true) {
	    	console.log("entrou");
	    	$('.bt_next').hide();
	    	$('.bt_enviar').show();
	    }
        ir_para_pagina(nova_pagina);
    }
}

var CheckMaximo = 3;
function verificar() {
	var Marcados = 1;
	var objCheck = $('.form .passo2 .checkbox');

	//Percorrendo os checks para ver quantos foram selecionados:
	for (var iLoop = 0; iLoop<objCheck.length; iLoop++) {
		//Se o número máximo de checkboxes ainda não tiver sido atingido, continua a verificação:
		if (Marcados <= CheckMaximo) {
			if (objCheck[iLoop].checked) {
				Marcados++;
			}

			//Habilitando todos os checkboxes, pois o máximo ainda não foi alcançado.
			for (var i=0; i<objCheck.length; i++) {
				objCheck[i].disabled = false;
			}

		//Caso contrário, desabilitar o checkbox;
		//Nesse caso, é necessário percorrer todas as opções novamente, desabilitando as não checadas;
		} else {
			for (var i=0; i<objCheck.length; i++) {
				if(objCheck[i].checked == false) {
					objCheck[i].disabled = true;
				}
			}
		}
	}
}