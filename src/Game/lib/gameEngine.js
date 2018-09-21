import * as PIXI from 'pixi.js'
import _ from 'lodash'


const Application =PIXI.Application;
const loader=PIXI.loader;
const resources=PIXI.loader.resources;
const Sprite=PIXI.Sprite
const TextureCache=PIXI.utils.TextureCache

let  loaderQueue=[]

class GameEngine {
    constructor(){
        this.app=null
        this.levels={}
        this.level=1
        this.levelConfig={}

        // 装取实例化 new Sprite的批量对象
        this.sprites={}

   
            
    }


    // 0. 因为this.levels={} ,因此通过外部传入参数，间接的把Level里,（已装配好数据）给撞进来吧 
    // 为第三步做好准备
    configLevel(configs){
        Object.values(configs).forEach(config=>{
            const {level}=config
            this.levels[level]=config
        })    
    }

    // 1.把图片放进去
    loadSource=(sources)=>{
        return new Promise(resolve=>{
            try{
                loader.add(sources).load(resolve);
            }catch(e){
                resolve(e)
            }
        })
    }

    // 2.初始化舞台画布，接着调用选择关卡
    init=(config)=>{
         config=config || {
            root:'game',
            width:900,
            height:500,
            level:1,
            speed:1,
        }
        this.app=new Application({
            width:config.width,
            height:config.height,
            antialias:true,
            resolution:1,
            transparent:true,
        })
        document.getElementById(config.root).appendChild(this.app.view)
        this.switch(config.level)
    }


    // 3.选择关卡，并调用设置精灵参数，然后调用  this.load()
    switch(level){
        this.app.stage.removeChild();
        this.level=level;
        const config=_.cloneDeep(this.levels[level])
        //存放当前等级的参数配置
        this.levelConfig=config || {}
        
        //参数拿到准备渲染一波精灵,先清空一波原来*实例过Sprite的数据
        this.sprites={}
        this.spriteInfo={}

        //给spriteInfo 取对应的名字
        const sprites=config.sprites
        sprites.forEach(spriteConfig=>{
            const {name}=spriteConfig
            
            this.spriteInfo[name]=spriteConfig

            //3.5 准备调整好精灵的姿势，渲染一波，精灵准备登场，装好子弹准备发射
            this.setSprite(spriteConfig)
        })

        // 4 静态图片load完后，使需要动的动起来，调用game.afterLoad()
        this.load().then(() => {
			if (this.afterLoad) {
				this.afterLoad();
			}
		});

    }

    //执行 3.5 
    setSprite(config){
        //没有参数就返回吧
        if(!config){
            return
        }

        //精灵的名字()
        let spriteName=config.name
        let url=config.imgUrl;

        //定义姿势形状，若有姿势变化，将设置好的config的值，通过set 实实在在的放入到this.sprite 中，
        //例如 Levels门的 anchor=[0.5,0.5] 的值, 设置装进 即将渲染的 sprite 中，
       
        const propsConfig=[
            {
                key:'rotation',
                default:0,
                set:(objSprite,key,value)=>{
                    return objSprite[key]=value
                }
            },
            
            //Q1: 见源代码，obj[key].set.apply(obj[key],value);
            
        ];

        function render(){

            // 终于实例化了 Sprite 的例子了，装在this.sprites
            this.sprites[spriteName]=new Sprite(resources[url].texture)

            //  调整已经实例化精灵的姿势，通过在level 里
            // 部分需要设置精灵形状的参数，传入 Pixi 里能改动Sprite 状态的方法，
            
            // propsConfig.forEach(function(prop) {
			// 	var key = prop.key;
			// 	var value = config[key] || prop.default;
			// 	var setFn = prop.set;
			// 	setFn(that.sprites[spriteKey], key, value);
			// });

            //将单个精灵放入舞台画布当中，show me the sprites !
            //因为上面是forEach() ， so 所有装入Levels 里的sprite 数组就被渲染出来了
            this.app.stage.addChild(this.sprites[spriteName])
        }

        // Q2:回调render()？ ,直接render() 出错
            if (resources[url]) {
                render.call(this);
                return;
            }
            loaderQueue.push({
                url: url,
                callback: render.bind(this)
            });
    }
    
    load=function (){
        var urls = [];
		loaderQueue.forEach(function(v) {
			if (urls.indexOf(v.url) === -1) {
				urls.push(v.url);
			}
		});
		return new Promise((resolve) => {
			if (urls.length === 0) {
				resolve();
				return;
			}
			loader.add(urls).load(function() {
				while (loaderQueue.length) {
					var loadItem = loaderQueue.shift();
					loadItem.callback();
				}
				resolve();
			});
		});
    }

    // 5. 此处为切换图片的功能，时间与单张图的切换功能 相结合动画
   // 改变已被 new Sprite 对象的texture 属性
    setSpriteTexture(sprite,imgUrl){
        sprite.texture=TextureCache[imgUrl]
    }
    
}

export default  GameEngine;
