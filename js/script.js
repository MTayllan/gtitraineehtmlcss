/* BEM VINDO, MARINHEIRO 
   O desafio demorou mas saiu rápido
   Antes de tudo, leia todas as dicas e obersações no link do desafio
   ...
   *-* Todo conteudo dentro de $(document).ready( function() { ... } ); será execultado assim que carregar a página
   */

   var count;


   $(document).ready(function() {
    //Inserir um comando para deixar a div #alerta movel  (Dica: função da jqueryui)
    $("#alerta").draggable();
    //chamar a funcão chamada "contador"
    count = setInterval(contador,1000);
    //Fazer a alerta aparecer depois de 5 segundos, chamando ã função toggleAlert    

    $("#novidadesform [type='submit']").click(function(e) {
        e.preventDefault();

        var email = $("input[name=email]").val();
        //criar uma variavel e pegar o conteudo digitado na input
        //verificar se o campo não está vazio com if e else
        if(email){
            //se não for vazio enviar uma requisição com -requisição AJAX- do tipo POST para http://51.254.204.44/ti/enviar_email.php 
            // -- passando o paramentro "meuemail" e o dataType JSON
            $.ajax({
                type: "POST",
                url: "http://51.254.204.44/ti/enviar_email.php",
                dataType: "json",
                data: {meuemail : email},
                success: function(data){
                    //SE OCORRER TUDO CERTO COM A REQUISIÇAO: 1° exibir um toastr.sucess com a mensagem 
                    toastr.success(data.text);  
                    // 2° colocar um texto na div  de class resultado. "*emaildigitado* foi salvo em nossa lista de novidades =)"
                    $(".resultado").html(email + " foi salvo em nossa lista de novidades =)");
                    //limpar input
                    $("#novidadesform [type='submit']").val(null);
                    //fechar a alerta depois de 2 segundos
                    setTimeout(toggleAlert,2000);
                },
                error: function(data){
                    //SE não ocorrer tudo certo a alerta ñ deve fechar. Exibir um toastr.error com a mensagem do erro retornada pelo servidor
                    toastr.error(data.responseJSON['text']);
                }
            });
        }else{ 
            //se for vazio execultar o comando abaixo
            //toastr.error('Preencha um email!', 'Error!');
            toastr.error('Preencha um email!', 'Error!');
        }
    });


    $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
      ) {
      // Figure out element to scroll to
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
        } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
        };
    });
    }
}
});

});

/* NÃO MEXER 
   Se tiver visível, após executar a função, a div será oculta e vice-versa
   */
   function toggleAlert() {
    $('#alerta').slideToggle();
}

//Contador inicia em 5
var i = 5;

function contador() {
    var contador = $("#contador");

    if(i<=0){
    //Ocultar a div #contador qnd o cronometro ser menor ou igual a ZERO
    contador.hide();
    clearInterval(count);
    toggleAlert();
}else if(i<=3){
        //Mudar a cor do texto da div #contador qnd o cronometro ser menor ou igual a TRES
        contador.css("color", "red");
    }

    contador.html("Alerta aparecendo em "+i);
    i--;

    //Sinalizar contador. Ex: Alerta aparecendo em: __  (usar a div #contador)
}