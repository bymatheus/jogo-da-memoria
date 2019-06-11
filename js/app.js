/*
 * Create a list that holds all of your cards
 */
const cards = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf', 'fa fa-bicycle','fa fa-bomb','fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf', 'fa fa-bicycle','fa fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Embaralha o array
const cardsEmbaralhado=shuffle(cards);

//Numera os ids para seleção
let numeroIdCard=0;

cardsEmbaralhado.forEach(function(card) {
    
    //Criando o ID do bloco
    numeroIdCard++;
    
    //add each card's HTML to the page
    $(".deck").append("<li class='card' id="+numeroIdCard+"><i class='"+card+"'></i></li>");
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 //Numero do clique
n=0;
j=0;
t=0;
a=0;

//Monitorando o clique na card
$("li.card").click(function() {

    //Verifica se não tem a classe card match
    bloco=$(this).attr('class');
    if(bloco != 'card match'){

        if(n=="0"){//Se o numero for 1
            
            //Soma um numero
            n="1";
            
            $(this).toggleClass('open show');//Mostra o icone
            primeiroPai=$(this);//Seta o primeiro pai
            idPrimeiroPai=$(this).attr('id');//Seta o id do primeiro pai

        }else if(n=="1"){//Se for o segundo bloco aberto

            //Soma um numero
            n="2";
            
            $(this).toggleClass('open show');//Mostra o bloco
            segundoPai=$(this);//Seta o segundo pai
            idSegundoPai=$(this).attr('id');//Seta o id do segundo pai

            setTimeout(function(){//Função que é executada após segundo clique
                
                //Verifica se o id dos pais são iguais
                if(idPrimeiroPai != idSegundoPai){//Se for diferente
                    somaJogada();
                    if(primeiroPai.children().attr('class') == segundoPai.children().attr('class')){//Se as classes são iguais
                    
                        //Adiciona a classe match e remove a open e a show
                        $(primeiroPai).toggleClass('open show match');
                        $(segundoPai).toggleClass('open show match');
                        
                        //Contabiliza um acerto
                        contabilizaAcerto();
    
                    }else{//Se as classes são diferentes
    
                        //Exibe um erro
                        $(primeiroPai).toggleClass('error');
                        $(segundoPai).toggleClass('error');
    
                        setTimeout(function(){//Espera um tempo para remover as classes de erro, aberto e exibir.
                            
                            //Remove as classes que exibem
                            $(primeiroPai).toggleClass('open show error');
                            $(segundoPai).toggleClass('open show error');
    
                        }, 500);
                        
                    }
                }
            }, 700);

            setTimeout(function(){
                //Zera a quantidade
                n="0";
            }, 1800);
        }
    }
});

//Função para somar jogada
function somaJogada(){
    
    //Soma uma nova jogada
    j++;
    
    //Exibe as estrelas personalizadas
    if(j<=15){
        $(".stars").empty();
        $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>");
    }else if(j>16 && j<20){
        $(".stars").empty();
        $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-half-o'></i></li>");
    }else if(j>20 && j<25){
        $(".stars").empty();
        $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li>");
    }else if(j>25 && j<30){
        $(".stars").empty();
        $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-half-o'></i></li><li><i class='fa fa-star-o'></i></li>");
    }else if(j>30){
        $(".stars").empty();
        $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li><li><i class='fa fa-star-o'></i></li>");
    }

    //Adiciona a jogada no contador
    $('.moves').text(j);
}

//Função para contabilizar acerto
function contabilizaAcerto(){
    a++;

    //Valida se o usuário encerrou o jogo
    if(a===8){

        //Finaliza o contador de tempo ao abrir o modal
        contabilizaTempo(1);
        
        //Se o acerto for numero 8 executa modal de parabéns
        $(document).ready(function() {
            $('#modalfinal').modal('show');
        });

    }
}

function contabilizaTempo(parametro){
    tempo = setInterval( function () {
        t++;
        $('.tempo').text(t);
    } , 1000);
    
    if(parametro === 1){
        clearInterval(tempo);
        $('.time').text(tempo);
    }
}

contabilizaTempo(3);