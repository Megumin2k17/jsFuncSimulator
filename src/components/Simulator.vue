<template>
    <div>       
        <template v-if="outOfQuestions">
            <p>Seems that you have already answered all questions in this category. You can go back to the menu and select another category.</p>           
            <button @click="$emit('exit')" style="display:block; margin: 15px auto;">Back to menu</button>
            <p>Or you should clear the simulator's memory before continue the categories you have selected.</p>
            <button @click="clearMemoryAndContinue" style="display:block; margin: 15px auto;">clearMemory and continue</button>
       </template>
       <template v-else-if="!failed">
            <div v-if="!completed" >
                <button style="max-width:160px; display: block; margin: 0 auto 20px auto;" @click="$emit('exit')">Back to menu</button>
                <p>Time: <i>{{counter + 'sec./' + getTotalTime + 'sec.'}}</i></p>
                <p>Questions: {{current + '/' + getQuestionsCount}}</p>
                <p style="margin:25px 0 15px 0;"><span style="font-weight: 600;">{{getType(mixedQuestions[current - 1].type) + ` method: `}}</span>{{mixedQuestions[current - 1].description}}</p>        
                <input type="text" placeholder="Type method name and press Enter" @keyup.enter.exact="checkAnswer" v-model="userAnswer">
            </div>
            <div v-else>
                <p>Grats noob!</p>
                <button @click="$emit('exit')">Back to menu</button>
            </div> 
       </template>      
       <template v-else>
            <p style="color: #e91e63;">Test failed due the timeout!</p>
            <button @click="reset">Press here to reset</button>
            <button @click="$emit('exit')">Back to menu</button>
       </template>       
        <p style="color: #e91e63;">{{error}}</p>
    </div>
    
</template>

<script>
import myData from './Data.js';

    export default {
        emits: [
            'exit', 'clearMemory'
        ],
        props:[
            'selected'
        ],
        data() {
            return {
                questions: undefined,
                mixedQuestions: undefined,
                current: 1,
                timer: undefined,
                counter: 0,
                completed: false,
                failed: false,
                userAnswer: undefined,
                error: undefined,
                outOfQuestions:false        
            }
        },
        computed: {
            getQuestionsCount() { 
                return this.getSortedQuestions.length;
            },
            getTotalTime() {
                return this.getQuestionsCount*15;
            },
            getSortedQuestions() {                

                let sorted = this.questions.filter(el=> {
                
                    if(this.selected.length > 0) {                        
                        return this.selected.includes(el.type);
                    }

                    return el;
                    
                });

                this.validateQuestionsData(sorted);
                return sorted;
            },  
        },
        methods: {
            fail() {
                if (this.counter == this.getTotalTime) {
                    clearInterval(this.timer);
                    this.failed = !this.failed;                    
                }
            },
            startTimer() {
                this.timer = setInterval(() => {                    
                    ++this.counter;
                    this.fail();
                }, 1000);
            },
            mixQuestions() {
                let mixedQuestions = [];

                for(let i=0; i<this.getQuestionsCount; i++) {
                    let rnd = Math.floor(Math.random() * this.getQuestionsCount);
                    if (mixedQuestions[rnd] == undefined) {
                        mixedQuestions[rnd] = this.getSortedQuestions[i];
                    } else {
                        i--;
                    }
                  
                }

                this.mixedQuestions = mixedQuestions;
            },           
            getType(type) { 
                let arr = type.split('');
                arr[0] = arr[0].toUpperCase();
                return arr.join('');
            },
            checkAnswer() {
                
                if(this.userAnswer == this.mixedQuestions[this.current - 1].name) {

                    this.rememberQuestion(this.mixedQuestions[this.current - 1].name);

                    if(this.current == this.mixedQuestions.length) {
                        this.completed = true;               
                    } else {                        
                        this.current++;
                    }

                    this.error = undefined;
                    this.userAnswer = undefined;
                    
                } else {
                    this.error = 'Your answer is wrong! Try again.';
                }
            },
            reset() {
                this.completed = false;
                this.failed = false;
                this.current = 1;
                this.error = undefined;
                this.userAnswer = undefined;
                this.counter = 0;
                this.mixQuestions();                
                this.startTimer();
            },
            rememberQuestion(question) {
                
                let rememberedQuestions = this.getRememberedQuestions();    
                
                if(rememberedQuestions == null) {
                    rememberedQuestions = [];
                }

                if(!rememberedQuestions.includes(question)) {
                    rememberedQuestions.push(question);
                    localStorage.setItem('rememberedQuestions', JSON.stringify(rememberedQuestions));
                }                
            },
            wasAnswered(questionName) {
                let rememberedQuestions = this.getRememberedQuestions();          

                if(rememberedQuestions != null && rememberedQuestions.includes(questionName)) {
                    return true;
                }
                return false;
            },           
            validateAnswered(questions) {

                let validated = questions.filter(el=>{
                    if(!this.wasAnswered(el.name)) {
                        return el; 
                    }
                });

                return validated;
            },
            validateQuestionsData(questions) {
                
                if(!questions.length>0) {
                    this.outOfQuestions = true;
                } else {
                    this.outOfQuestions = false;
                }
            },
            getRememberedQuestions() {
                let rememberedQuestions = localStorage.getItem('rememberedQuestions');
                rememberedQuestions = JSON.parse(rememberedQuestions);

                if(rememberedQuestions != null && rememberedQuestions.constructor !== Array) {
                    rememberedQuestions = [];
                }                
                return rememberedQuestions;
            },
            clearMemoryAndContinue() {
                this.$emit('clearMemory');
                this.setUpQuestions();
                this.setUpTimer();
            },
            setUpQuestions() {
                this.questions = this.validateAnswered(myData.methods);
                this.mixQuestions(); 
            },
            setUpTimer() {
                if(!this.outOfQuestions) {
                    this.startTimer();
                }
            }
        },
        created() {
            this.setUpQuestions();
            this.setUpTimer();
        },
        
    }
</script>

<style scoped>
input {
    min-width: 220px;
}
button {
    display: inline-block;
    margin: 3px;
}
p {
    text-align: center;
    margin: 5px auto;
}
input {
    display: block;
    margin: 0 auto;
    justify-self: center;
}
</style>