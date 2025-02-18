// BE SURE TO IMPORT YOUR QUEUE CLASS

import {Queue} from "./1-queue"

// ==============================
// 1️⃣ Implement a Recent Calls Counter
// ==============================
// Write a function that counts the number of requests received in the past 3000 milliseconds.
// Use a queue to efficiently track the timestamps of requests.

class requestCounter{
    private queue : Queue<number>

    constructor(){
        this.queue = new Queue<number>();
    }

    ping(ms : number): number{
        this.queue.enqueue(ms);
        while(true){
            const front = this.queue.front();
            if(!front){
                break;
            }
            if(ms > front + 3000){
                this.queue.dequeue();
            }else{
                break;
            }
        }
        return this.queue.size();
    }
}

const recentCounter = new requestCounter();
console.log(recentCounter.ping(1));
console.log(recentCounter.ping(100));
console.log(recentCounter.ping(3001));
console.log(recentCounter.ping(3002));

// Example Test Cases:
// recentCounter.ping(1);    // returns 1
// recentCounter.ping(100);  // returns 2
// recentCounter.ping(3001); // returns 3
// recentCounter.ping(3002); // returns 3

// ==============================
// 2️⃣ First Unique Character in a String
// ==============================
// Given a string `s`, find the **first unique character** and return its index.
// If no unique character exists, return `-1`. Use a queue to efficiently track character order.

function firstUniqChar(input : string) : number{
    const charQueue = new Queue<string>();
    const charCount = new Map<string, number>();
    for(const letter of input){
        const newCount : number = (charCount.get(letter) || 0) + 1;
        charCount.set(letter, newCount);
        charQueue.enqueue(letter);
    }

    const size = charQueue.size();
    for(let i = 0; i < size; i++){
        const letter = charQueue.dequeue();
        if(letter !== null){
            const count = charCount.get(letter);
            if(count === 1){
                return i;
            }
        }
    }
    return -1;
}

console.log(firstUniqChar("leetcode"));
console.log(firstUniqChar("loveleetcode"));
console.log(firstUniqChar("aabb"));

// Example Test Cases:
// firstUniqChar("leetcode") // 0
// firstUniqChar("loveleetcode") // 2
// firstUniqChar("aabb") // -1

// ==============================
// 3️⃣ Implement a Stack Using Queues
// ==============================
// Implement a stack using only two queues.
// The implemented stack should support `push`, `pop`, `top`, and `isEmpty` operations.

class Stack<T>{
    private a: Queue<T>
    private b: Queue<T>

    constructor(){
        this.a = new Queue<T>();
        this.b = new Queue<T>();
    }

    push(e : T){
        this.a.enqueue(e);
    }

    pop(): T | null{
        if(this.a.isEmpty()){
            return null;
        }
        while(this.a.size() > 1){
            const e = this.a.dequeue();
            if(e === null){
                return null;
            }
            this.b.enqueue(e);
        }

        const result = this.a.dequeue();
        [this.a, this.b] = [this.b, this.a];
        return result;
    }

    top(): T | null{
        if(this.a.isEmpty()){
            return null;
        }
        while(this.a.size() > 1){
            const e = this.a.dequeue();
            if(e === null){
                return null;
            }
            this.b.enqueue(e);
        }

        const result = this.a.dequeue();
        if(result !== null){
            this.b.enqueue(result);
        }
        [this.a, this.b] = [this.b, this.a];
        return result;
    }

    isEmpty(){
        return this.a.isEmpty();
    }
}

const myStack = new Stack<number>();
myStack.push(1);
myStack.push(2);
console.log(myStack.top());
console.log(myStack.pop());
console.log(myStack.isEmpty());

// Example Test Cases:
// myStack.push(1);
// myStack.push(2);
// myStack.top();    // returns 2
// myStack.pop();    // returns 2
// myStack.isEmpty(); // returns false

// ==============================
// 4️⃣ Rotting Oranges
// ==============================
// Given a 2D grid where `0` is an empty cell, `1` is a fresh orange, and `2` is a rotten orange,
// determine the minimum number of minutes needed for all fresh oranges to rot. Use BFS with a queue.

// Example Test Cases:
// orangesRotting([[2,1,1],[1,1,0],[0,1,1]]) // 4
// orangesRotting([[2,1,1],[0,1,1],[1,0,1]]) // -1
// orangesRotting([[0,2]]) // 0

// ==============================
// 5️⃣ Sliding Window Maximum
// ==============================
// Given an array `nums` and an integer `k`, return the maximum values in every window of size `k`.
// Use a deque (double-ended queue) to efficiently track the max values.

// Example Test Cases:
// maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3) // [3,3,5,5,6,7]
// maxSlidingWindow([1], 1) // [1]
// maxSlidingWindow([9, 11], 2) // [11]
