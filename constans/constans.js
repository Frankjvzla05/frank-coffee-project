const base_url = "https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod";

// Menú //
export const mainMenu = `${base_url}/api/menus`;

export const getCredentials = (clientId, clientSecret, data) => {
    const audience = 'https://escalab.academy';
    const grantType = 'client_credentials';
    const params = {
        "client_id": clientId,
        "client_secret": clientSecret,
        "audience": audience,
        "grant_type": grantType
    }

    return fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
}

export const getOrders = (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders", requestOptions)
}