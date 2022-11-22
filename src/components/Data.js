export default {
    methods: [
        {
            type: 'string',
            name: 'replace',
            description: 'find and replace, takes regular expressions'
        },
        {
            type: 'string',
            name: 'toUpperCase',
            description: 'convert to upper case'
        },
        {
            type: 'string',
            name: 'toLowerCase',
            description: 'convert to lower case'
        },
        {
            type: 'string',
            name: 'split',
            description: 'splitting a string on characters gives an array'
        },       
        {
            type: 'array',
            name: 'push',
            description: 'add new element to the end of array'
        },
        {
            type: 'array',
            name: 'pop',
            description: 'remove last element from array'
        },
        {
            type: 'array',
            name: 'unshift',
            description: 'add new element to the beginning of array'
        },
        {
            type: 'array',
            name: 'shift',
            description: 'remove first element from array'
        },      
        {
            type: 'math',
            name: 'min',
            description: 'get the lowest value'
        },
        {
            type: 'math',
            name: 'max',
            description: 'get the highest value'
        },
        {
            type: 'math',
            name: 'floor',
            description: 'get rounded down number'
        },
        {
            type: 'math',
            name: 'sqrt',
            description: 'get square root'
        },
        {
            type: 'date',
            name: 'getDate',
            description: 'get day as a number (1-31)'
        },
        // {
        //     type: 'date',
        //     name: 'getDay',
        //     description: 'get weekday as a number (0-6)'
        // },
        // {
        //     type: 'date',
        //     name: 'getFullYear',
        //     description: 'four digit year (yyyy)'
        // },
        // {
        //     type: 'date',
        //     name: 'getMonth',
        //     description: 'get month (0-11)'
        // }
    ]
}