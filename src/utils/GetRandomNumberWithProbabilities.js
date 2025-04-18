
export default function GetRandomNumberWithProbabilities(probabilities) {


    function getRandomNumberByPercentage() {
        // Generate random number between 1-100
        const random = Math.floor(Math.random() * 100) + 1;

        let cumulativePercentage = 0;

        // Check which range the random number falls into
        for (let i = 0; i <= 7; i++) {
            cumulativePercentage += probabilities[i];
            if (random <= cumulativePercentage) {
                return i;
            }
        }

        return 7; // Fallback return
    }

    // Function to validate probabilities
    function validateProbabilities() {
        const total = Object.values(probabilities).reduce((sum, value) => sum + value, 0);
        if (total !== 100) {
            console.warn(`Warning: Probabilities sum to ${total}%, not 100%`);
            return false;
        }
        return true;
    }

    // Function to change probability for a specific number
    function setProbability(number, percentage) {
        if (number >= 0 && number <= 7) {
            probabilities[number] = percentage;
            console.log(`Set probability for number ${number} to ${percentage}%`);
            validateProbabilities();
        } else {
            console.error('Invalid number. Must be between 0 and 7');
        }
    }

    // Function to test distribution
    function testDistribution(iterations = 1000) {
        const results = {
            0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
        };

        for (let i = 0; i < iterations; i++) {
            const num = getRandomNumberByPercentage();
            results[num]++;
        }

        console.log(`\nResults after ${iterations} iterations:`);
        console.log('Number | Actual % | Expected %');
        console.log('--------------------------------');

        for (let i = 0; i <= 7; i++) {
            const actualPercentage = (results[i] / iterations * 100).toFixed(1);
            console.log(`   ${i}   |   ${actualPercentage}%   |    ${probabilities[i]}%`);
        }
    }

    const randNum = getRandomNumberByPercentage()

    // console.log("randNum", randNum());

    return randNum

}