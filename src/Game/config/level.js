import Ip from '../lib/ip'


const Level={
    '1':{
        level:1,
        dir:['walk','key'],
        sprites:[],
        ipDirection:[0,-1],
        ipOriginPosition:[398,309]

    }
}

//将零碎的关卡数据组装，（结合图片数据信息）
function initLevel(){
    Object.entries(Level).forEach(([level,config])=>{
        const {ipDirection,ipOriginPosition}=config

        // 归宿于 new Sprite(resources[imgUrl].texture)
        // 图片一张张的渲染当 前轮回的应该显示的图片
        
        const ipImgUrl=Ip.getCurrentImg()
        console.log(ipImgUrl)
        //配置精灵参数信息,精灵键值模板不能更换，由写好的GameEngine 会调用配置好的spriteInfo 决定的
        const ipConfig={
            name:'ip',
            spriteType:'ip',
            imgUrl:ipImgUrl,
            direction:ipDirection,
            originPosition:ipOriginPosition,
        };

        [ipConfig].forEach(config=>{
            createSprite(level,config)
        })
    })
}

// 将需要完整的，打包好的精灵信息，分关卡的批次组装，压入 关卡.精灵 组中
function createSprite(level,config){
    const {position}=config
    const sprite={
        ...config
    }
    Level[level].sprites.push(sprite);
}


//运行写好的初始化函数
initLevel()
export default Level