export async function getData(url) {
    const customHeaders = new Headers({
        'ngrok-skip-browser-warning': 'skip-browser-warning'
    });

    const response = await fetch(url, {
        method: 'GET', // or 'POST' or other HTTP method if needed
        headers: customHeaders // Include your custom headers
    });

    if (response.status === 200) {
        const json = await response.json();
        return json;
    }

    throw new Error(response.status);
}


export async function postData(url, params) {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    const obj = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };

    const response = await fetch(url, obj);

    if (response.status == 200) {
        const json = await response.json();
        return json;
    }

    throw new Error(response.status);
}