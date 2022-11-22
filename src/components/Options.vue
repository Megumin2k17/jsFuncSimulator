<template>
    <div style="text-align:center; align-self: top; justify-self: top;">
        <p>Select methods category and press the "Start" button to begin:</p>        
        <button @click="toggleOption('string')" :class="selectedOptions.includes('string')?'active':''">Strings methods</button>
        <button @click="toggleOption('array')" :class="selectedOptions.includes('array')?'active':''">Arrays methods</button>
        <button @click="toggleOption('math')" :class="selectedOptions.includes('math')?'active':''">Math methods</button>
        <button @click="toggleOption('date')" :class="selectedOptions.includes('date')?'active':''">Dates methods</button>
    </div>    
</template>

<script>
import myData from './Data.js';

    export default {
        emits: [
            'options'
        ],
        data() {
            return {
                selectedOptions: undefined,
                defaultOptions: ['string', 'array', 'date', 'math']
            }
        },
        methods: {
            toggleOption(option) {
                if(this.selectedOptions.includes(option)) {
                    this.selectedOptions = this.selectedOptions.filter(el=>el != option); 
                    this.removeCategoryFromStorage(option);
                                     
                } else {
                    this.selectedOptions.push(option);
                    this.addCategoryToStorage(option);
                }
                
                this.$emit('options', this.selectedOptions);
            },
            getCategoriesFromStorage() {
                let categories = localStorage.getItem('categories');
                categories = JSON.parse(categories);
                if(categories != null && !categories.length>0) {
                    categories = [];
                }
                return categories;
            },
            addCategoryToStorage(category) {

                let categories = this.getCategoriesFromStorage();

                if(!categories.includes(category)) {
                    categories.push(category);
                }
                
                localStorage.setItem('categories', JSON.stringify(categories));
            },
            removeCategoryFromStorage(category) {

                let categories = this.getCategoriesFromStorage();

                if(categories.includes(category)) {
                    categories = categories.filter(el=>{return el != category});
                }

                localStorage.setItem('categories', JSON.stringify(categories));
            }
           
        },
        created() {
            let categories = this.getCategoriesFromStorage();

            if(categories == null || !categories.length>0) {               
                localStorage.setItem('categories', JSON.stringify(this.defaultOptions));
            }
            this.selectedOptions = this.getCategoriesFromStorage();
            this.$emit('options', this.selectedOptions);
        }
       
    }
</script>

<style scoped>
    button {
        display: inline-block;
        margin: 3px;
        border: 1px solid rgba(107,94,255,.5);
        color: #6b5eff;
        background: transparent; 
    }
    .active {
        border: 1px solid transparent;
        background: #6b5eff;
        color: #fff;
        opacity: 0.8;
    }
</style>