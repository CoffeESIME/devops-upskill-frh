export default {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    DB:
    {
        URI: process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/nutria`,
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}