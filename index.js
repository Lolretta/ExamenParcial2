#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question_1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'What is my first Last Name?\n',
      choices: [
        'Reta',
        'Retta',
        'Ramirez',
        'Mondongo ',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Retta');
  }

  async function question_2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is my favorite animal?',
      choices: [
        'Dogs',
        'Birds',
        'Snakes',
        'Cats'
      ],
    });
  
    return handleAnswer(answers.question_2 === 'Cats');
  }
  
  async function question_3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: 'Which is my favorite candy?',
      choices: [
        'Ice Cream',
        'Lollipop',
        'Caramel',
        'Chocolate'
      ],
    });
  
    return handleAnswer(answers.question_3 === 'Chocolate');
  }
  
  async function question_4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'Which is my favorite color?',
      choices: [
        'Black',
        'White',
        'Yellow',
        'Green',
      ],
    });
  
    return handleAnswer(answers.question_4 === `Black`);
  }
  
  async function question_5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message: 'Which is my favorite anime?',
      choices: [
        'Naruto',
        'One Piece',
        'Kimetsu no Yaiba',
        'Koe no Katachi'
      ],
    });
  
    return handleAnswer(answers.question_5 === 'One Piece');
  }


  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question_1();
await question_2();
await question_3();
await question_4();
await question_5();
winner();
