<template>
  <div id="app" :style="!started?`grid-template-rows: 1fr 1fr;`:`grid-template-rows: 1fr;`">

  
    <div v-if="!started">
      <h1>Simulator for learning dafault JavaScript methods</h1>
      <p>The simulator will display a description of the function, and you should enter the name of this function.</p>     
      <p>The simulator will not show you the questions that were asked previously.</p>
      <p>Press the button below to clear the memory and be able to see those questions again.</p>
      
      <div style="text-align:center;">
        <button @click="clearMemory" :disabled="isMemoryEmpty?true:false">Clear memory</button>
      </div>  
    </div>
    
    
    <div style="display: grid; align-self: stretch;">
     
        <div v-if="!started" >
          <options @options="select" />
            <p style="margin-top: 60px; color: #e91e63;">{{error}}</p>
            <button style="margin: 0 auto; display:block;" @click="started = !started" :disabled="error?true:false">Start</button>       
        </div>
        <div v-else style="align-self: center; justify-self: center;">
          <simulator           
          :selected="selected"
          :started="started"
          @exit="reset(), validateMemory()"
          @clearMemory="clearMemory"   
          />
        </div>
        
      
    </div>
  
  </div>
</template>

<script>

import options from './components/Options.vue';
import simulator from './components/Simulator.vue';

export default {
  components: {
    options, simulator
  },
  data() {
    return {
      selected: [],
      started: false,
      error: undefined,
      isMemoryEmpty: undefined
    }
  },
  computed: {

  },
  methods: {
    select(options) {      
      this.validateOptions(options);      
      this.selected = options;

    },
    validateOptions(options) {
      if(options != null && options.length === 0) {
        this.error = 'You have to select at least one category before start!';
      } else {
        this.error = undefined;
      }
    },
    reset() {
      this.started = false;
    },
    clearMemory(started) {

      if(confirm('The simulator will forget all questions you had already answered. Are you sure?')) {
        let rememberedQuestions = [];

        localStorage.setItem('rememberedQuestions', JSON.stringify(rememberedQuestions));       
      }
      
      this.validateMemory();
    },
    validateMemory() {

      let rememberedQuestions = JSON.parse(localStorage.getItem('rememberedQuestions'));
      
      if(rememberedQuestions != null && rememberedQuestions.length>0) {
        this.isMemoryEmpty = false;
      } else {
        this.isMemoryEmpty = true;
      } 
     
    }
  },
  created() {
    this.validateMemory();
  }
 
}
</script>

<style scoped>
  #app {
    height: 100%;
    display:grid;
    grid-template-columns: 1fr;    
    justify-items: center;
    align-items: center
  }

  h1 {
    text-align: center;
  }

  p {
      text-align: center;
  }  

</style>
