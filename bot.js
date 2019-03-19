// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes, MessageFactory } = require('botbuilder');
var numQuestion = 111;
var questions = new Array(15);
questions[0] = "What is the Microsoft Slogan?\n A) We innovate. You turn.\nB) The most magical place on Earth. \nC) Open Happiness. \nD) Just Do It.";
questions[1] = "What is the foundation year of Microsoft? \nA)1957 \nB)2000 \nC)1960 \nD)1975";
questions[2] = "What is the foundation city of Microsoft? \nA)Albuquerque \nB)Washingtion \nC)São Paulo \nD)Rio de Janeiro";
questions[3] = "Who were the founders of Microsoft? \nA)Linus Torvalds e Steve Jobs \nB)Bill Gates e Paul Allen \nC)Grace Hooper e Bill Gates \nD)Bill Gates e Steve Jobs";
questions[4] = "What the founders of Microsoft done for the Altair 8800? \nA)BASIC interpreters \nB)MS-DOS \nC)XEROX \nD)NOKIA";
questions[5] = "";
questions[6] = "";
questions[7] = "";
questions[8] = "";
questions[9] = "";
questions[10] = "";
questions[11] = "";
questions[12] = "";
questions[13] = "";
questions[14] = "";
questions[15] = "";
var ok = new Array(5);
ok = [0,0,0,0,0];
var answers = ["A", "D", "A", "B", "A"]
const options = ['A', 'B', 'C', 'D'];
var correctOption = "A";
var contador = 0;
/**
 * A bot that responds to input from suggested actions.
 */
class SuggestedActionsBot {
    /**
     * Every conversation turn for our SuggestedActionsbot will call this method.
     * There are no dialogs used, since it's "single turn" processing, meaning a single request and
     * response, with no stateful conversation.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            const text = turnContext.activity.text;

            // Create an array with the valid color options.
            
            correctOption = answers[numQuestion];

            // If the `text` is in the Array, a valid color was selected and send agreement.
            if (options.includes(text) && text == correctOption) {
                await turnContext.sendActivity(`You're right!!! Option ${ text } is the right one. `);
                contador++;
                await turnContext.sendActivity(`Até o momento você ganhou `+ contador*10000);
                await this.sendSuggestedActions(turnContext);
            }
            else if(options.includes(text) && text != correctOption){
                await turnContext.sendActivity(`You're wrong :/ The correct option is ` + correctOption);
                await turnContext.sendActivity(`You lost everything :( `);
                //await turnContext.sendActivity(`Would you like to restart? `);
                
            }
            else {
                await turnContext.sendActivity('Please select a option.');
            }

            // After the bot has responded send the suggested actions.
            //await this.sendSuggestedActions(turnContext);
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            await this.sendWelcomeMessage(turnContext);
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected.]`);
        }
    }

    /**
     * Send a welcome message along with suggested actions for the user to click.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendWelcomeMessage(turnContext) {
        const activity = turnContext.activity;
        if (activity.membersAdded) {
            // Iterate over all new members added to the conversation.
            for (const idx in activity.membersAdded) {
                if (activity.membersAdded[idx].id !== activity.recipient.id) {
                    const welcomeMessage = `Welcome to The Million Show ${ activity.membersAdded[idx].name }. ` +
                        `In this game you will play for one million dollars!! ` +
                        `Good Luck!!!`;
                    await turnContext.sendActivity(welcomeMessage);
                    await this.sendSuggestedActions(turnContext);
                }
            }
        }
    }

    /**
     * Send suggested actions to the user.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendSuggestedActions(turnContext) {
        await turnContext.sendActivity(`Answear the following question: `);
        numQuestion = Math.floor(Math.random()*5);
        while(ok[numQuestion] === 1){
            numQuestion = Math.floor(Math.random()*5);
        }
        ok[numQuestion] = 1;
        await turnContext.sendActivity(questions[numQuestion]);
        var reply = MessageFactory.suggestedActions(['A', 'B', 'C', 'D'], 'Pick one of the options.');
        await turnContext.sendActivity(reply);
    }

    async generateQuestion(){
        
    }
}

module.exports.SuggestedActionsBot = SuggestedActionsBot;
