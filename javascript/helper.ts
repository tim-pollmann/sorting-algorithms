/* eslint-disable import/prefer-default-export */
const sleep = async (milliseconds: number) => new Promise((handler) => { setTimeout(handler, milliseconds); });

export { sleep };
