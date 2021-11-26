import { Handler } from '../types';

export const getHome: Handler = async (req, res) => {
    res.status(200).json("hello");
}