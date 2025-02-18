// BE SURE TO IMPORT YOUR STACK CLASS

import {Stack} from "./2-stack"

// ==============================
// 1️⃣ Reverse a String Using a Stack
// ==============================
// Write a function that takes a string as input and returns the reversed string using a stack.
// You may only use stack operations (`push`, `pop`, `isEmpty`).

function reverseString(input: string){
    const s = new Stack<string>();
    for(const letter of input){
        s.push(letter);
    }

    let result = "";
    while(!s.isEmpty()){
        result = result.concat(s.pop() ?? "");
    }

    return result;
}

// Example Test Cases:
console.log(reverseString("hello")); // "olleh"
console.log(reverseString("world")); // "dlrow"
console.log(reverseString("")); // ""
console.log(reverseString("abcd")); // "dcba"


// ==============================
// 2️⃣ Check for Balanced Parentheses
// ==============================
// Given a string containing only the characters `()`, `{}`, and `[]`,
// write a function to determine if the string is valid.
// A string is valid if brackets are closed in the correct order. Use a stack to track open brackets.

function isValidParentheses(input : string){
    const s = new Stack<string>();

    for(const letter of input){
        if(letter === "(" || letter === "{" || letter === "["){
            s.push(letter);
        }else if(letter === ")"){
            const v = s.pop();
            if(v !== "("){
                return false;
            }
        }else if(letter === "}"){
            const v = s.pop();
            if(v !== "{"){
                return false;
            }
        }else if(letter === "]"){
            const v = s.pop();
            if(v !== "["){
                return false;
            }
        }
    }
    if(!s.isEmpty()){
        return false;
    }
    return true;
}

// Example Test Cases:
console.log(isValidParentheses("({[]})")); // true
console.log(isValidParentheses("({[)]}")); // false
console.log(isValidParentheses("()")); // true
console.log(isValidParentheses("{[()]}")); // true
console.log(isValidParentheses("(((")); // false

// ==============================
// 3️⃣ Evaluate a Postfix Expression
// ==============================
// Write a function that evaluates a mathematical expression in **postfix notation** (Reverse Polish Notation).
// The function should use a stack to process numbers and operators.
// Assume the input is a space-separated string of numbers and `+`, `-`, `*`, or `/` operators.

function evaluatePostfix(input: string){
    const tokens = input.split(" ");
    const s = new Stack<number>();
    for(const token of tokens){
        if(token === "+" || token === "-" || token === "*" || token === "/"){
            const a = s.pop();
            const b = s.pop();
            if(a !== null && b !== null){
                if(token === "+"){
                    s.push(b + a);
                }else if(token === "-"){
                    s.push(b - a);
                }else if(token === "*"){
                    s.push(b * a);
                }else if(token === "/"){
                    s.push(b / a);
                }
            }
        }else{
            s.push(parseInt(token));
        }
    }

    return s.pop();
}

// Example Test Cases:
console.log(evaluatePostfix("3 4 +")); // 7
console.log(evaluatePostfix("5 1 2 + 4 * + 3 -")); // 14
console.log(evaluatePostfix("10 2 8 * + 3 -")); // 23
console.log(evaluatePostfix("6 2 /")); // 3
console.log(evaluatePostfix("4 5 * 2 /")); // 10

// ==============================
// 4️⃣ Next Greater Element
// ==============================
// Given an array of integers, find the **next greater element** for each element.
// The next greater element of an element **x** is the first element to the right that is greater than **x**.
// If none exists, return `-1` for that element. Use a stack for efficiency.

function nextGreaterElement(input : number[]){
    
    const result : number[] = new Array(input.length).fill(-1);
    const s = new Stack<number>();

    for(let i = input.length - 1; i >= 0; i--){
        const n = input[i];
        
        let next = s.peek();
      
        while(next !== null && next <= n){
            s.pop();
            next = s.peek();
        }
        
        const r = s.peek();
        if(r !== null){
            result[i] = r;
        }
        
        s.push(n);
    }
   
    return result;
}

// Example Test Cases:
console.log(nextGreaterElement([4, 5, 2, 10, 8])); // [5, 10, 10, -1, -1]
console.log(nextGreaterElement([3, 2, 1])); // [-1, -1, -1]
console.log(nextGreaterElement([1, 3, 2, 4])); // [3, 4, 4, -1]

// ==============================
// 5️⃣ Daily Temperatures
// ==============================
// Given an array `temperatures` where `temperatures[i]` is the temperature on day `i`,
// return an array **answer** where `answer[i]` is the number of days you have to wait after the `i-th` day
// to get a warmer temperature. If there is no future day with a warmer temperature, return `0`.



function dailyTemperatures(temperatures: number[]){
    const result = new Array(temperatures.length).fill(0);
    const s = new Stack<number[]>();

    for(let i = temperatures.length - 1; i >= 0; i--){
        const t = temperatures[i];
        
        let next = s.peek();
      
        while(next !== null && next[0] <= t){
            s.pop();
            next = s.peek();
        }
        
        const r = s.peek();
        if(r !== null){
            result[i] = r[1] - i;
        }
        
        s.push([t, i]);
    }
   
    return result;
}

// Example Test Cases:
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1, 1, 4, 2, 1, 1, 0, 0]
console.log(dailyTemperatures([30, 40, 50, 60])); // [1, 1, 1, 0]
console.log(dailyTemperatures([30, 20, 10])); // [0, 0, 0]
