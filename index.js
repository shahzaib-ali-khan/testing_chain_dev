const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://main.d1aos5rwqljdla.amplifyapp.com';
