var express = require('express');
var router = express.Router();
var db=require('../modules/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addNovel', function(req, res, next){
  var novels = [
    {
      "cover": "/pic/bookcover_1.jpg",
      "title": "我被男神的白月光魂穿了！",
      "author": "软炸团子",
      "smallDetail": "编推语：安非以为的情敌其实暗恋他好久了。",
      "bigDetail": "天才演员遭逢意外，一夕魂穿纨绔子弟，改头换面重踏璀璨星途，使亲朋刮目，令世人惊艳！——多么美好的故事，如果我不是那个被魂穿的纨绔子弟的话。最最可恨的是，这个占据我身体的讨厌家伙，正是我男神的白月光……第一人称傻白甜受，cp为顾怀x安非，架空世界娱乐圈，谈恋爱为主~谢谢大家的支持！本文预计于下周一（22日）从第三十五章入v，入v当日三更，感谢阅读~"
    },
    {
      "cover":"/pic/bookcover_1.jpg",
      "title":'来日方长',
      "author":"一只西瓜大又圆",
      "smallDetail":"一个硬邦邦的甜饼~暴躁攻X寡言受",
      "bigDetail":"面对丁一博的土味求爱，邹斐头疼地叹一口气，这件铁了心往他身上扒的“小棉袄”，他是穿，还是不穿？ 一个硬邦邦的甜饼~暴躁攻X寡言受 隔日更~ 上车请进@西瓜今天更文了吗 "
    },
    {
      "cover":"/pic/bookcover_1.jpg",
      "title":'三少爷的剑',
      "author":"王白先生",
      "smallDetail":"我懒得折腾这红尘，可红尘偏要折腾我。",
      "bigDetail":"大少爷说：“我要东街的铺子。”二少爷说：“我要烟雨楼的姑娘。”三少爷说：“我要出家。”--佛系懒散少爷攻X风流倜傥高手受古派标题的金派武侠。和古大侠的那本小说和电影没关系啦，借了个名（起名废）每周大概三更，每更一般5000字以上~视写爽的程度而定老实人求各种投喂(*^▽^*)"
    }, {
      "cover":"/pic/bookcover_1.jpg",
      "title":'纸飞机',
      "author":"潭石",
      "smallDetail":"破镜重圆",
      "bigDetail":"初遇，5岁的汤君赫视6岁的杨煊为英雄，心甘情愿做他的小跟屁虫。 杨煊：“纸飞机有12种折法，不知道吧？我来教你。” 十年后，17岁的汤君赫以弟弟的身份住到了杨煊家里，上一辈的恩怨纠葛尚未消弭，两个少年短兵相接，争锋相对。 “先陷进去的那个人会输，我早就知道，但我乐意。” 一晃又一个十年过去，28岁的汤君赫与29岁的杨煊意外重逢，是物是人非事事休还是物非人是景长留？ 同处黑暗里的两个人，谁也成不了谁的光。 那就一起走吧，一起寻找光。 王子骑白马 月亮不见啦 还有猫咪总是追着尾巴有多傻 小时候的记忆好无价 ——林忆莲《纸飞机》 破镜重圆，HE，大概会是酸甜苦辣咸混合的一块小饼干 乍一看是刀子，其实都是糖，嘻嘻…… cp是 杨煊x汤君赫"
    }
  ];
  db.novelModel.insertMany(novels, function(err, result){
    if(err){
      res.json({code: 201, message: '插入数据出错！'});
      return;
    }
    res.json({code: 200, message: '插入成功！'});
  })
})

router.get('/getNovels', function(req, res, next){
  var page = req.query.page || 1;
  var pageSize =4;
  db.novelModel.find({}, function(err, result){
    if(err){
      res.json({code: 201, message: '访问数据出错！'});
      return;
    }
    res.json({code: 200, message: '访问成功！', novels: result})
  }).limit(pageSize).skip((page-1)*pageSize);
})

router.get('/getNovelItem/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  db.novelModel.find({_id: id}, function(err, result){
    if(err){
      res.json({code: 201, message: "访问数据出错！"});
      return
    }
    res.json({code: 200, message: "访问成功！", NovelItem: result});
  })
})

module.exports = router;
