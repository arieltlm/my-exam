import React from 'react';

const find = function (origin) {
    return {
        where: function (regObj) {
            let arr = [...origin];
            // 使用forEach
            // Object.entries(regObj).forEach(([key, regValue]) => {
            //     arr = arr.filter((originItem) => {
            //         return new RegExp(regValue).test(originItem[key]);
            //     });
            // });
            // 只考虑一个属性
            // const [[key,regValue]] = Object.entries(regObj)
            // const arr = origin.filter(originItem =>{
            //     return new RegExp(regValue).test(originItem[key])
            // })

            // 使用for of
            for (const [key, regValue] of Object.entries(regObj)){
                arr = arr.filter(originItem => {
                    return new RegExp(regValue).test(originItem[key])
                })
            }

            return {
                orderBy: function (orderkey, orders = "desc") {
                    return [...arr].sort((a, b) => {
                        return orders === "desc" ? b[orderkey] - a[orderkey] : a[orderkey] - b[orderkey];
                    });
                },
            };
        },
    };
};
const data = [
    { userId: 8, title: "title1", id: "112r" },
    { userId: 11, title: "other", id: "112" },
    { userId: 15, title: null, id: "112" },
    { userId: 19, title: "title2", id: "112" },
    { userId: 16, title: "title3", id: "11dd" },
];
// 查找 data 中，符合条件的数据，并进行排序
const result = find(data)
    .where({
        title: /\d$/,
        id: /[a-z]/,
    })
    .orderBy("userId", "desc");
console.log(result); // [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];


function Exam1(){
    return (
        <div>第一题</div>
    )
}

export default Exam1
