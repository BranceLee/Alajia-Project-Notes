import GameEngine from './gameEngine';
import Ip from './ip'
import Level from '../config/level'
import TWEEN from '@tweenjs/tween.js';

const ipImg=Ip.getAllImgs()


const loadImgs=[].concat(ipImg)

//使得所有的TWEEN 能正常运行
function animateLoop(time) {
  requestAnimationFrame(animateLoop);
  TWEEN.update(time);
}
requestAnimationFrame(animateLoop);

const game=new GameEngine()

// A 让图出现
game.setup =(config=null)=>{
    game.configLevel(Level)
    game.loadSource(loadImgs)
      .then(()=>game.init(config))
}

//B 需要动的动画动起来
game.afterLoad=()=>{
  const spriteInfo=game.spriteInfo['ip']
  const {direction}=spriteInfo
  console.log(direction)
  Ip.setDirection(direction)

  Ip.setMode('float',(imgUrl)=>{
    const sprite=game.sprites['ip'];
    game.setSpriteTexture(sprite,imgUrl)
  },1000)
}



export default game;
