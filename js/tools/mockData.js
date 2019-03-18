export const iconCollect = {
    1: 'https://qiniu.hp.gimyingao.com/icon_tb1.png',
    2: 'https://qiniu.hp.gimyingao.com/icon_tb2.png',
    3: 'https://qiniu.hp.gimyingao.com/icon_tb3.png',
    4: 'https://qiniu.hp.gimyingao.com/icon_tb4.png',
    5: 'https://qiniu.hp.gimyingao.com/icon_tb5.png',
    6: 'https://qiniu.hp.gimyingao.com/icon_tb6.png',
    7: 'https://qiniu.hp.gimyingao.com/icon_tb7.png',
    8: 'https://qiniu.hp.gimyingao.com/icon_tb8.png',
    9: 'https://qiniu.hp.gimyingao.com/icon_tb9.png',
    10: 'https://qiniu.hp.gimyingao.com/icon_tb10.png',
    11: 'https://qiniu.hp.gimyingao.com/icon_tb11.png',
    12: 'https://qiniu.hp.gimyingao.com/icon_tb12.png',
};

export const deviceInfoData = {
    F:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'FANS_SWITCH',
            2: 'FANS_LIGHT_SWITCH' , 
            3: 'FANS_LIGHT_BRIGHT',
            4: 'FANS_LIGHT_COUNTDOWN',
            5: 'FANS_COUNTDOWN',
        }]
    },
    S:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'S1',
            2: 'S2' , 
            3: 'S3',
        }]
    },
    T:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'T1',
            2: 'T2' , 
            3: 'T3',
        }]
    },
    A:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'A1',
            2: 'A2' , 
            3: 'A3',
        }]
    },
    B:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'B1',
            2: 'B2' , 
            3: 'B3',
        }]
    },
    C:{
        route: "",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'C1',
            2: 'C2' , 
            3: 'C3',
        }]
    },
    D:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'D1',
            2: 'D2' , 
            3: 'D3',
        }]
    },
    G:{
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'G1',
            2: 'G2' , 
            3: 'G3',
        }]
    },
    LG0002: {
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'LG0002 Switch',
            2: 'LG0002 LampSwitch' , 
            3: 'LG0002 LampLight',
        }]
    },
    LG0001: {
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'LG0001 Switch',
            2: 'LG0001 LampSwitch' , 
            3: 'LG0001 LampLight',
        }]
    },
    LG0003: {
        route: "FengInfo",
        automationroute: 'FengInfoAtuoMation',
        image: "../img/icon_tb1.png",
        action:[{
            1: 'LG0003 Switch',
            2: 'LG0003 LampSwitch' , 
            3: 'LG0003 LampLight',
        }]
    }
};


//不联动
// export const timingJson =[{    
//     label: '春',
//     value: '春',
// },{
//     label: '夏',
//     value: '夏',
// }];





export const timingJson = [
    {
        label: 'Cancel setting timing',
        value: 'Cancel setting timing',
    },{
        label: '1h',
        value: '1h',
        children:[{
            label: '1m',
            value: '1m',
        },{
            label: '2m',
            value: '2m',
        },{
            label: '3m',
            value: '3m',
        },{
            label: '4m',
            value: '4m',
        },{
            label: '5m',
            value: '5m',
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '7m',
            value: '7m', 
        },{
            label: '8m',
            value: '8m', 
        },{
            label: '9m',
            value: '9m', 
        },{
            label: '10m',
            value: '10m', 
        },{
            label: '11m',
            value: '11m', 
        },{
            label: '12m',
            value: '12m', 
        },{
            label: '13m',
            value: '13m', 
        },{
            label: '14m',
            value: '14m', 
        },{
            label: '15m',
            value: '15m', 
        },{
            label: '16m',
            value: '16m', 
        },{
            label: '17m',
            value: '17m', 
        },{
            label: '18m',
            value: '18m', 
        },{
            label: '19m',
            value: '19m', 
        },{
            label: '20m',
            value: '20m', 
        },{
            label: '21m',
            value: '21m', 
        },{
            label: '22m',
            value: '22m', 
        },{
            label: '23m',
            value: '23m', 
        },{
            label: '24m',
            value: '24m', 
        },{
            label: '25m',
            value: '25m', 
        },{
            label: '26m',
            value: '26m', 
        },{
            label: '27m',
            value: '27m', 
        },{
            label: '28m',
            value: '28m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        },{
            label: '6m',
            value: '6m', 
        }],
    },{
        label: '2h',
        value: '2h',
        children:[{
            label: '1m',
            value: '1m',
        },{
            label: '2m',
            value: '2m',
        },{
            label: '3m',
            value: '3m',
        },{
            label: '4m',
            value: '4m',
        },{
            label: '5m',
            value: '5m',
        },{
            label: '6m',
            value: '6m', 
        }],
    }  
];
