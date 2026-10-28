// Building uses transcribed from the user-supplied on-campus sign, 2026-10-28.
export const places=[
 {id:'E',name:'图书馆 / 企业港',en:'LIBRARY · ENTERPRISE HUB',detail:'现场图：图书馆 1F；E 栋另列创业与企业港、金融与商务学院、物联网学院。学习超市标为环廊 2F',ring:10,color:0xa8a470},
 {id:'D',name:'人工智能与先进技术学院',en:'AI & ADVANCED TECHNOLOGY',detail:'现场图：人工智能与先进技术学院、物联网学院；D1 / D2 分翼',ring:8,color:0x8f72a9},
 {id:'G',name:'影视学院 / 博物馆',en:'FILM · MUSEUM',detail:'现场图：影视与创意科技学院；世界高等教育发展史（博物馆）1F',ring:14,color:0xa98c75},
 {id:'J',name:'学生中心',en:'STUDENTS CENTRE',detail:'现场图：学生中心；中央景观内的小型公共建筑',inner:[-19,17],color:0xd3af57},
 {id:'H',name:'行政中心',en:'ADMINISTRATION',detail:'现场图：行政中心、西浦创业家学院（太仓）行业高管教育',inner:[19,-19],color:0xd3af57},
 {id:'A',name:'芯片 / 智造 / 机器人学院',en:'CHIPS · MANUFACTURING · ROBOTICS',detail:'现场图：芯片学院、智造生态学院、智能机器人学院；A1 / A2 分翼',ring:2,color:0x9d8baa},
 {id:'B',name:'未来教育 / 学者空间',en:'EDUCATION · SCHOLAR SPACE',detail:'现场图：未来教育学院、产业家学院、学者空间/科研宾馆、西浦-集萃学院',ring:4,color:0x80a09a},
 {id:'C',name:'创业与企业港 / 芯片学院',en:'ENTERPRISE HUB · CHIPS',detail:'现场图：创业与企业港、芯片学院；C1 / C2 分翼',ring:6,color:0x9ba48b},
 {id:'F',name:'F 栋',en:'BUILDING F',detail:'现场图确认 F1 / F2 分翼；本次照片中的学院图例未列明 F 栋用途',ring:12,color:0xad9b76}
];
export const facilities=[
 {id:'pool',name:'游泳馆',x:-132,z:-126},
 {id:'stadium',name:'体育馆',x:-105,z:-125},
 {id:'hall',name:'多功能报告厅',x:-67,z:-141},
 {id:'sports',name:'体育场',x:-130,z:66},
 {id:'courts',name:'室外球场',x:-130,z:-26}
];
export function buildGraph(){const nodes={};const put=(id,x,z)=>nodes[id]={id,x,z,neighbors:[]};const edge=(a,b)=>{nodes[a].neighbors.push(b);nodes[b].neighbors.push(a)};for(let i=0;i<16;i++){const a=i*Math.PI/8;put('r'+i,Math.sin(a)*43,Math.cos(a)*43)}for(let i=0;i<16;i++)edge('r'+i,'r'+((i+1)%16));put('south',24,118);put('southApproach',24,58);edge('south','southApproach');edge('southApproach','r1');put('north',44,-118);put('northApproach',44,-104);edge('north','northApproach');edge('northApproach','r7');for(const p of places){if(p.inner){put(p.id,p.inner[0]+(p.id==='J'?-10:14),p.inner[1]+(p.id==='J'?8:-8));edge(p.id,p.id==='J'?'r14':'r6');}else{const a=p.ring*Math.PI/8;put(p.id,Math.sin(a)*48,Math.cos(a)*48);edge(p.id,'r'+p.ring)}}return nodes}
export const nodes=buildGraph();
export function shortestPath(from,to){const distance=Object.fromEntries(Object.keys(nodes).map(k=>[k,Infinity])),prev={},pending=new Set(Object.keys(nodes));distance[from]=0;while(pending.size){let u=[...pending].reduce((a,b)=>distance[a]<distance[b]?a:b);pending.delete(u);if(u===to||!Number.isFinite(distance[u]))break;for(const v of nodes[u].neighbors){const d=distance[u]+Math.hypot(nodes[u].x-nodes[v].x,nodes[u].z-nodes[v].z);if(d<distance[v]){distance[v]=d;prev[v]=u}}}if(!Number.isFinite(distance[to]))return[];let path=[to];while(path[0]!==from)path.unshift(prev[path[0]]);return path}
export function pathLength(path){return path.slice(1).reduce((s,id,i)=>s+Math.hypot(nodes[id].x-nodes[path[i]].x,nodes[id].z-nodes[path[i]].z),0)}
export function bearing(a,b){return Math.atan2(nodes[b].x-nodes[a].x,nodes[b].z-nodes[a].z)}
export function angleDiff(a,b){return Math.atan2(Math.sin(a-b),Math.cos(a-b))}
export function chooseForward(id,yaw){let best=null,diff=Infinity;for(const n of nodes[id].neighbors){const d=Math.abs(angleDiff(bearing(id,n),yaw));if(d<diff){diff=d;best=n}}return diff<Math.PI*.31?best:null}
