
export async function fetchData(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);

    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error(errorBody.error);
    }
}