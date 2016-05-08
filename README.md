## About
Dr Speech is an Alexa skill that is designed to help people who speak English as a second language to improve the accuracy of their pronunciation. Alexa will ask the user to say a random word and it will vaildate whether it is the correct word or not. To use the skill, the user first needs to say "Doctor Speech" which is the trigger word. They are then prompted to select one of the three categories which are verb, noun and adjective. After the category is selected, Alexa will give you a random word to pronounce.

## Setup
To run this example skill you need to do two things. The first is to deploy the example code in lambda, and the second is to configure the Alexa skill to use Lambda.

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in us-east or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function or Get Started Now button.
3. Skip the blueprint
4. Name the Lambda Function "Hello-World-Example-Skill".
5. Select the runtime as Node.js
5. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise Lambda function will not work.
6. Select Code entry type as "Upload a .ZIP file" and then upload the .zip file to the Lambda
7. Keep the Handler as index.handler (this refers to the main js file in the zip).
8. Create a basic execution role and click create.
9. Leave the Advanced settings as the defaults.
10. Click "Next" and review the settings then click "Create Function"
11. Click the "Event Sources" tab and select "Add event source"
12. Set the Event Source type as Alexa Skills kit and Enable it now. Click Submit.
13. Copy the ARN from the top right to be used later in the Alexa Skill Setup


## Examples
    User: "Alexa, tell Greeter to say hello"
    Alexa: "Hello World!"
