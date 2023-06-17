// PPL 2023 HW4 Part2

// Q 2.1 

// Specify the return type.
export const delayedSum = (a: number, b: number, delay: number):Promise<number> => {
    return new Promise(
        (resolve)=>{
            setTimeout(()=>
                resolve(a+b)
            ,delay)})
}

export const testDelayedSum = (a: number, b: number, delay: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      delayedSum(a, b, delay)
        .then(() => {
          if ((Date.now() - start) >= delay) {
            resolve(`delayed at least ${delay} milliseconds`);
          } else {
            resolve(`delayed less than ${delay} milliseconds`);
          }
        })
        .catch((errorHandler) => {
          reject(errorHandler);
        });
    });
  };
  
 

// Q 2.2
// Values returned by API calls.
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}
// When invoking fetchData(postsUrl) you obtain an Array Post[]
// To obtain an array of posts
export const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 

// Append the desired post id.
export const postUrl = 'https://jsonplaceholder.typicode.com/posts/'; 

// When invoking fetchData(invalidUrl) you obtain an error
export const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid';

//helper function
export const BringLength = (urls: Post[]): number => {
  const filteredUrls = urls.filter((url) => !!url);
  // the !!url double negation operator i search and learn that
  //it converts the url value to a boolean by coercing it to either false or true 
  //
  //filteredUrls array will only contain the truthy values from the urls array 
  return filteredUrls.length;
};
// Depending on the url - fetchData can return either an array of Post[] or a single Post.
// Specify the return type without using any.
export const fetchData = async (url: string): Promise<Post[] | Post> => {
    const response = await fetch(url)
    
    if (!response.ok) {
        throw new Error(`Error Status: ${response.status} ${response.statusText}`);
    }
    return response.json()
}
    

export const testFetchData = async (singleurl: string): Promise<string> => {
  try {
    ////// 1 //////
    const Posts = await fetchData(postsUrl);
    expect(Array.isArray(Posts)).toEqual(true);//checking just if Posts array
    expect(BringLength( await (await (fetch(postsUrl))).json())).toEqual(100);
    ////// 2 //////

        const res = await fetchData(singleurl);
        const resid= Array.isArray(res) ? res[0].id : res.id
        expect(res).toHaveProperty('id', resid);
        expect(res).toHaveProperty('userId');
        expect(res).toHaveProperty('title',);
        expect(res).toHaveProperty('body');
        
    //////   3   /////
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/'
      const result = await fetchData(apiUrl + 21);
        expect(result).toHaveProperty('id', 21);
        expect(result).toHaveProperty('userId', 3);
        expect(result).toHaveProperty('title',"asperiores ea ipsam voluptatibus modi minima quia sint");
        expect(result).toHaveProperty('body');
    ///// 4 /////
        await expect(fetchData(invalidUrl)).rejects.toThrow(Error)
        return 'passed'
  }catch (error) {
    throw new Error();
  }
}


// Q 2.3
// Specify the return type.
export const fetchMultipleUrls = async (urls: string[]): Promise<any[]> => {
  
    const PromArr = urls.map((url) => fetch(url));//extract the data from each URL using fetch
    await Promise.all(PromArr.map(async (prom) => {
      if (!(await prom).ok) {
        throw new Error();
      }
    }))
    const responses = await Promise.all(PromArr);
    const convertData = [];
    for (const response of responses) {
      const data = await response.json();
      convertData.push(data);
    }
    return convertData;
}

export const testFetchMultipleUrls=async(requestedPostUrl: string ): Promise<string>=> {
  try {
    const urls = Array.from({length: 20 }, (_, i) => postUrl + (i + 1));
    const req=await fetchData(requestedPostUrl)
    const reqid= Array.isArray(req) ? req[0].id : req.id
    const posts = await fetchMultipleUrls(urls);
    expect(posts.length).toEqual(20);
    expect(posts[posts.length - 1].id).toEqual(reqid);
    return 'passed';
  } catch (error) {
    throw new Error();
  }
}


