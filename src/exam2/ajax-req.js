import http from './ajax'

// 缓存对象（全局变量，每次刷新页面/打开关闭页面之后重置）
var cacheObj = {};

const reqFun = (url, methods, query, key) =>
    new Promise((resolve, reject) => {
        http.ajax({
            type: methods,
            url,
            data: query,
            beforeSend(xhr) {
                if (cacheObj[key]) {
                    cacheObj[key].queue.push(xhr);
                    cacheObj[key].status = "running";
                }
            },
            success(result) {
                resolve(result);
            },
            error(xhr, err) {
                reject(xhr, err);
            },
            complete() {
                if (cacheObj[key]) {
                    cacheObj[key].status = 'free'
                }
            },
        });
    });

// 请求
const repeatReq = (url, methods, query, key) =>
    new Promise((resolve, reject) => {
        reqFun(url, methods, query, key)
            .then((res) => {
                // 成功后缓存数据，并返回值
                cacheObj[key].data = res;
                resolve(res);
            })
            .catch((err) => {
                const { errorCount, autoRefreshCount } = cacheObj[key];
                cacheObj[key].errorCount = errorCount + 1;
                // 自动重试请求
                if (autoRefreshCount - errorCount > 0) {
                    console.log(`自动重试第${cacheObj[key].errorCount}次`);
                    repeatReq(url, methods, query, key);
                } else {
                    console.log("请求失败", err);
                }
                reject(err);
            })
            .catch((err) => {
                console.log(err);
            });
    });


// 等待正在请求的那个请求完成请求了直接返回值
const waitBeforeReq = (currentReq, key) =>
    new Promise((resolve) => {
        // const interval = setInterval(() => {
        //     if (cacheObj[key].data && cacheObj[key]?.status === "free" && currentReq.readyState === 4) {
        //         clearInterval(interval);
        //         resolve(cacheObj[key].data);
        //     }
        // }, 500);
        currentReq.addEventListener("load", function () {
            resolve(cacheObj[key].data);
        });
    });

const ajaxReq = (url, methods, query) => {
    const key = `${url}-${methods}}-${query}`;
    
    if (cacheObj[key]) {
        if (cacheObj[key]?.status === "free" && cacheObj[key]?.data) {
            // 已经请求过的取缓存中的数据
            return Promise.resolve(cacheObj[key].data);
        }
        if (cacheObj[key].status === "running") {
            // 如果前一个请求正在进行中，则挂起等待正在请求的那个请求完成直接取请求到的值
            const currentReq = cacheObj[key].queue.find((item) => item.readyState !== 4);
            return waitBeforeReq(currentReq, key);
        }
    }
    // 之前没有出现过就在缓存中增加一条记录并发起请求
    cacheObj[key] = {
        status: "free", // 当前接口请求的状态 'free|running'
        data: null, // 缓存数据
        errorCount: 0,
        autoRefreshCount: 5, // 自动重试的总次数
        queue: [], // 请求队列
    };
    return repeatReq(url, methods, query, key);
};

export { ajaxReq };
