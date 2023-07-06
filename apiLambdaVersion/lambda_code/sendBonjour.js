
exports.handler = async (event) => {
    console.log('LAMBDA declenchée ! ');
    const response = {
        statusCode: 200,
        body: JSON.stringify('BONJOUR'),
    };
    return response;
};
