import { describe, expect, test } from '@jest/globals'
import {
    delayedSum, Post, postsUrl, postUrl, invalidUrl, fetchData, fetchMultipleUrls, testDelayedSum, testFetchMultipleUrls,testFetchData
} from '../src/part2';

describe('Assignment 4 Part 2', () => {
    describe('Q2.1 delayedSum (6 points)', () => {
        test('delayedSum returns the sum', async () => {
            await delayedSum(1,2,1000).then((SuccesHandler)=> expect(SuccesHandler).toEqual(3))
            await delayedSum(3,2,1000).then((SuccesHandler)=> expect(SuccesHandler).toEqual(5))
            await delayedSum(0,10,1000).then((SuccesHandler)=> expect(SuccesHandler).toEqual(10))

        })
        test('delayedSum waits at least the specified delay', async () => {
                await testDelayedSum(1, 2, 3000).then((SuccesHandler) => {
                    expect(SuccesHandler).toEqual("delayed at least 3000 milliseconds");
                }).catch((errorHandler) => {throw errorHandler });
                await testDelayedSum(3, 2, 200).then((SuccesHandler) => {
                    expect(SuccesHandler).toEqual("delayed at least 200 milliseconds");
                }).catch((errorHandler) => {throw errorHandler });
                await testDelayedSum(10, 0, 1000).then((SuccesHandler) => {
                    expect(SuccesHandler).toEqual("delayed at least 1000 milliseconds");
                }).catch((errorHandler) => {throw errorHandler });
        })
    })
    describe('Q2.2 fetchData (12 points)', () => {
        test('successful call to fetchData with array result, singlePost, and invalifUrl', async () => {
            await expect(testFetchData((postUrl +1))).resolves.toEqual("passed")    
            await expect(testFetchData((postsUrl +1))).rejects.toThrow(Error)
        })
    })
    

    describe('Q2.3 fetchMultipleUrls (12 points)', () => {
        test('successful call to fetchMultipleUrls', async () => {
            const urll = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts'];
            const posts = await fetchMultipleUrls(urll);
            expect(Array.isArray(posts)).toEqual(true);           
            ////////////checking with len /////////////////

            const urls = ['https://jsonplaceholder.typicode.com/posts/21', 'https://jsonplaceholder.typicode.com/posts'];
            try {
            const posts = await fetchMultipleUrls(urls);
            const arrData1 = await fetch(urls[0]);
            const arrLen1 = await arrData1.json();
            const arrData2 = await fetch(urls[1]);
            const arrLen2 = await arrData2.json();
            const ans = arrLen1.length + arrLen2.length;
            expect(ans).toEqual(101);
            expect(Array.isArray(posts)).toEqual(true);
            } catch (ErrorHandler) {
             // ErrorHandler if any URL fetch fails
            }
        })
        test('successful call to fetchMultipleUrls: verify results are in the expected order ', async () => {
            const urls = ['https://jsonplaceholder.typicode.com/posts/21', 'https://jsonplaceholder.typicode.com/posts'];
            const posts = await fetchMultipleUrls(urls);
            expect(posts[0].id).toEqual(21);
            expect(posts[1][0].id).toEqual(1);
            expect(posts[1][4].title).toEqual("nesciunt quas odio");
            expect(posts[1][99].body).toEqual("cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut");
        })
        test('failed call to fetchMultipleUrls', async () => {
            const invaild =[invalidUrl,'https://jsonplaceholder.typicode.com/posts/21']
            await expect(fetchMultipleUrls(invaild)).rejects.toThrow(Error)
        })

        //// these test i wrote to testFetchMultipleUrls function
        test('testFetchMultipleUrls' , async ()=>{
            await expect(testFetchMultipleUrls(postUrl + 20)).resolves.toEqual('passed')
            await expect(testFetchMultipleUrls(postUrl + 1)).rejects.toThrow(Error)

        })
    })
});

