// const _fetch = (requestPromise, timeout) => {
export default function _fetch(requestPromise, timeout) {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
        timeoutAction = () => {
            reject("请求超时");
        }
    })
    setTimeout(() => {
        timeoutAction()
    }, timeout)
    return Promise.race([requestPromise, timerPromise])
}