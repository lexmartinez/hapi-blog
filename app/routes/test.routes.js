module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('Hello, world!');
        }
    }
]