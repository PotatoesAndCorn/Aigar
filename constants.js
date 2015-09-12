
module.exports = {
    SERVER_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    SERVER_IP_ADDR: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
}
