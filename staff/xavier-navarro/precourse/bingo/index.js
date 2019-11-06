function playerName(){
    let user = prompt("Introduce your user, please")
    return user
}
function generateBingoCard(totalCardLines){
    const totalNumCard = 15
    let numbersCard = []
    let numCard = []
    let index = 0
    let bingoCard = []
    let numberPerLine = Math.floor(totalNumCard/totalCardLines)
    let line = 1
    let count = 0
    do{
        let newNum = randomNum()
        if(!numbersCard.includes(newNum)){
          let obj = {"number" : newNum, "line" : line, "matched" : false}  
          bingoCard.push(obj)
          numbersCard.push(newNum) 
          index++
          count++
          if(count == numberPerLine){
            line++
            count = 0
          }
        }
    }while(numbersCard.length < totalNumCard)
    return bingoCard
}
function printCard(card, numLines){
    let numPerLines  = Math.floor(card.length/numLines)
    let cardLine  = ''
    let count = 1
    for(let i = 1; i <= numLines; i++){
        for(let j = 0; j < card.length; j++){
            if(card[j]['line'] == i){
                if(count == numPerLines){
                    if(card[j]["matched"] === false){
                        cardLine += card[j]['number']
                    }else{
                        cardLine += 'X'
                    }
                    console.log(cardLine) 
                    count = 1
                    cardLine = ''
                }else{
                    if(card[j]["matched"] === false){
                        cardLine += card[j]['number']+','
                    }else{
                        cardLine += 'X,'
                    }
                    count++           
                }
            }
        }
    }
}
function startGame(){
    let start = confirm("Do you want to start the game with this card? If not, press 'Cancerlar' and you'll have another card.")
    return start
}
function newTurn(){
    let turn = confirm("Do you want to start the turn?")
    return turn
}
function cardComplete(card){
    for(let i = 0; i < card.length; i++) {
        if(card[i]['matched'] === false) return false
    }
    return true
}
function lineComplete(card,num){
    let line = card[num]['line']
    for(let j = 0; j < card.length; j++){
        if(card[j]['line'] == line){
            if(card[j]['matched'] === false) return  false
        }
    }
    return true
}
function randomNum(){
    let number
    number = Math.floor((Math.random()*99)+1)
    return number
}
function matchNumber(card,num){
    for(let i = 0; i < card.length; i++){
        if(card[i]['number'] === num) return i
    }
    return false
}
function replaceNumber(card,pos){
    card[pos]["matched"] = true
    return card
}
function getScore(turns){
    let finalScore
    // First the player start with 100 points
    let  score = 100
    // Player loss one point for each turn
    finalScore = score-turns
    // Depending on how many shifts you complete the card, you'll receive and extra putuation
    if(turns <= 50){
       finalScore += 100
    }else if(turns <= 75){
        finalScore += 50
    }else if(turns <= 90){
        finalScore += 25
    }else{
        finalScore += 10
    }

    return finalScore
}
function addToRanking(player){
    let addRecord = false
    for(let i = 0; i < rank.length; i++){
      if(rank[i]['score'] <= player['score'] && addRecord === false){
        player['ranking'] = rank[i]['ranking']
        rank.splice(i,0,player)
        addRecord = true
        i++
      }
      if(addRecord === true) rank[i]['ranking'] = rank[i]['ranking']+1
    }
    if(addRecord === false){
      if(rank.length == 0){
        player['ranking'] = 1
      }else{
        let position = rank.length-1
        player['ranking'] = rank[position]['ranking']+1
      }
      rank.push(player)
    }
  }
function printRanking(ranking){
    console.log("RANKING:")
    for(let i = 0; i < ranking.length; i++){
        console.log(ranking[i]["ranking"]+". Player name: "+ ranking[i]["player"]+" Score: "+ranking[i]['score'])
    }
    if(rank.length == 0) console.log("There are no records.")
    console.log("_____________________")
}
function bingo(){
    let user = playerName()
    if(user === '') user = "Player one"
    console.log("Player name: "+ user)
    let playerScore = {player: user, score: 0, ranking: 0}
    let card
    const totalCardLines = 3
    let start = false
    let turn
    let countTurns = 0
    let numbersBingo = []
    let lineIsCompleted = false
    let finish = false
    
    do {
        card = generateBingoCard(totalCardLines)
        console.log("Card:")
        let printedCard = printCard(card, totalCardLines)
        start = startGame()
    }while(start === false)  

    if(start === true){
        do{
            turn =  newTurn()
            if(turn === false){
                finish = true
                console.log("Ciao!")
            }else {
                let existNumber
                let number
                do{
                    number = randomNum()
                    existNumber = numbersBingo.includes(number)
                    if(existNumber === false) numbersBingo.push(number)
                }while(existNumber === true)
                alert("Number: "+ number)
                let match = matchNumber(card, number)
                if(match !== false){
                    console.log("Match! Number "+number)
                    card = replaceNumber(card,match)
                    let checkLine = lineComplete(card,match)
                    if(checkLine === true && lineIsCompleted === false){
                        lineIsCompleted = true
                        console.log("Line!")
                    }
                    printCard(card,totalCardLines)
                }
                finish = cardComplete(card)
            }
            countTurns++
        }while(finish === false)
        if(finish === true && turn === true){
            playerScore['score'] = getScore(countTurns)
            addToRanking(playerScore)
            console.log("Bingoo! Total turns: "+countTurns)
            console.log("Final score: "+playerScore['score'])
        }
    }else{
        console.log("Ciao!")
    }
}

function playBingo(){
    let playAgain
    do{
        printRanking(rank)
        bingo()
        playAgain = confirm("Do you want to play again?")
    }while(playAgain === true)
    console.log("Good bye!")
}

let rank = []

playBingo()