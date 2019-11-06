//PASAPALABRA OOP

class Material {
  constructor() {
    this.questions = [
      { letter: "a", answer: "anagram", status: 0, question: "With the letter A.\nA word or phrase made by using the letters of another word or phrase in a different order."},
      { letter: "b", answer: "blind", status: 0, question: "With the letter B.\nSomeone who is unable to see."},
      { letter: "c", answer: "chaos", status: 0, question: "With the letter C.\nA state of total confusion with no order."},
      { letter: "d", answer: "dialysis", status: 0, question: "With the letter D.\nA process of separating substances from liquid by putting them through a thin piece of skin-like material, especially to make pure the blood of people whose kidneys are not working correctly."},
      { letter: "e", answer: "evil", status: 0, question: "With the letter E.\nProfoundly immoral and wicked."},
      { letter: "f", answer: "fear", status: 0, question: "With the letter F.\nAn unpleasant emotion caused by the threat of danger, pain, or harm."},
      { letter: "g", answer: "ghost", status: 0, question: "With the letter G.\nAn apparition of a dead person which is believed to appear or become manifest to the living, typically as a nebulous image."},
      { letter: "h", answer: "habit", status: 0, question: "With the letter H.\nA settled or regular tendency or practice, especially one that is hard to give up."},
      { letter: "i", answer: "imagination", status: 0, question: "With the letter I.\nThe faculty or action of forming new ideas, or images or concepts of external objects not present to the senses."},
      { letter: "j", answer: "jewel", status: 0, question: "With the letter J.\nAn ornament or piece that contains a precious stone or stones."},
      { letter: "k", answer: "kleptomania", status: 0, question: "With the letter K.\nA recurrent urge to steal, typically without regard for need or profit."},
      { letter: "l", answer: "lier", status: 0, question: "With the letter L.\nA person who doesn't tell the truth."},
      { letter: "m", answer: "mindfullness", status: 0, question: "With the letter M.\nthe practice of being aware of your body, mind, and feelings in the present moment, thought to create a feeling of calm."},
      { letter: "n", answer: "narcissist", status: 0, question: "With the letter N.\nA person who has an excessive interest in or admiration of themselves."},
      { letter: "o", answer: "origami", status: 0, question: "With the letter O.\nThe Japanese art of folding paper into decorative shapes and figures."},
      { letter: "p", answer: "plum", status: 0, question: "With the letter P.\nAn oval fleshy fruit which is purple, reddish, or yellow when ripe and contains a flattish pointed stone."},
      { letter: "q", answer: "questionnaire", status: 0, question: "With the letter Q.\nA list of questions that several people are asked so that information can be collected about something."},
      { letter: "r", answer: "roar", status: 0, question: "With the letter R.\nA full, deep, prolonged cry uttered by a lion or other large wild animal."},
      { letter: "s", answer: "sir", status: 0, question: "With the letter S.\nUsed as a polite or respectful way of addressing a man, especially one in a position of authority."},
      { letter: "t", answer: "turquoise", status: 0, question: "With the letter T.\nA greenish-blue colour."},
      { letter: "u", answer: "ultimatum", status: 0, question: "With the letter U.\nA final demand or statement of terms, the rejection of which will result in retaliation or a breakdown in relations."},
      { letter: "v", answer: "voice", status: 0, question: "With the letter V.\nThe sound produced in a person's larynx and uttered through the mouth, as speech or song."},
      { letter: "w", answer: "warp", status: 0, question: "With the letter W.\nA piece of rope holded by the extremes which serves to jump."},
      { letter: "x", answer: "hexagon", status: 0, question: "Contains the letter X.\nA plane figure with six straight sides and angles."},
      { letter: "y", answer: "year", status: 0, question: "With the letter Y.\nThe time taken by the earth to make one revolution around the sun."},
      { letter: "z", answer: "zoology", status: 0, question: "With the letter Z.\nThe scientific study of animals, especially their structure."},]
  }
}


class Player {
  constructor(name) {
    this._name = name;
    this._points = 0;
  }

  get name() {
    return this._name;
  }

  get points() {
    return this._points;
  }

  addPoints(points) {
    this._points += points;
  }
}


class Ranking {
  constructor(player) {
    this.ranking = [];
    this.player = player
  }
  setRanking(player) {
    this.ranking.push({name: player.name, points: player.points})
    this.ranking.sort((a, b) => b.points - a.points)
    let counter = 1;
    console.log("Ranking:")
    for(let i in this.ranking) {
      console.log(`${counter}: ${this.ranking[i].name} => ${this.ranking[i].points} points`)
      counter++;
    }
  }
}


class AlphabetGame {
  constructor() {
    this.ranking = new Ranking(this.player)
    this.generatePlay();
  }

  generatePlay() {
    this.player = this.generatePlayer();
    this.round = 0;
    this.material = new Material();
    this.play();
    this.showResults();
    this.addToRanking()
    this.playAgain();
  }

  generatePlayer() {
    this.name = this.greetUser();
    let player = new Player(name);
    return player;
  }

  greetUser() {
    console.log("Welcome to The Alphabet Game, we are going to display a diccionary definition for each alphabet letter and you have to guess the word. More correct answers, more points achieved. At the end, your score and position in the global ranking will be shown.")
    name = prompt("What is your name?");
    if(name === "")
      name = "anonymous"
    alert("Hello, " + name)
  }

  play() {
    let questions = this.material.questions
    while(questions.some(elem => elem.status === 0)) {
      this.round++
      console.log("Round " + this.round)
      for(let i = 0; i < questions.length; i++) {
        if(questions[i].status === 0) {
          console.log(questions[i].question)
          let answer = prompt("Insert your answer:");
          if(answer === questions[i].answer) {
            questions[i].status = true;
            this.player.addPoints(1);
            console.log("\nCorrect, you have achieved 1 point!\n")
          } else if(answer === null) {
            console.log("\nOk, the game is over\n");
            return;
          } else if(answer === "next") { //traducido "pasapalabra" por "next"
            console.log("\nOk, we'll come back later\n")
          }
          else {
            questions[i].status = false;
            console.log("\nIncorrect!\n");
          }
        }
      }
    }
  }

  playAgain() {
    confirm('Do you want to play again?') ? this.generatePlay() : alert("Ok, bye!")
  }

  showResults() {
    console.log(this.player.name + ", you finally scored " + this.player.points + " points and it took you " + this.round + " rounds.");
      let rightAnswers = [];
      let wrongAnswers = [];
      this.material.questions.forEach(elem =>
        elem.status ? rightAnswers.push(elem.letter) : wrongAnswers.push(elem.letter)
      )
      console.log("You have guessed the following letters: " + rightAnswers)
      console.log("You have failed the following letters: " + wrongAnswers)
  }
  addToRanking() {
     if(this.material.questions.every(elem => elem.status !== 0)) {
      this.ranking.setRanking(this.player)
    } else {
      console.log("You exit the game.\nWe are sorry but your score cannot be included in the records.")
    }
  }
}

new AlphabetGame()