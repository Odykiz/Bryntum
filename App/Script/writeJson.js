export async function writeJson(json) {

    const response = await fetch('../Resource/puffer.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });
    return response.json();
}