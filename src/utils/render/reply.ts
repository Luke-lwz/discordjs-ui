import render from "./render";

async function reply(msg: any) {
    await render(msg, { reply: true });
}   

export default reply;
