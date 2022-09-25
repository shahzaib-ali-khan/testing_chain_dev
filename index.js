const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://main.d2u2raup6p62x0.amplifyapp.com';
