export const places=[
 {id:'D',name:'图书馆',en:'LIBRARY',detail:'D 栋 · 图书馆位于 1F–2F',ring:8,color:0x8f72a9},
 {id:'E',name:'学习超市',en:'LEARNING MALL',detail:'E 栋 · 学习超市位于 2F–3F',ring:10,color:0xa8a470},
 {id:'G',name:'博物馆',en:'MUSEUM',detail:'G 栋 · 博物馆位于 1F',ring:14,color:0xa98c75},
 {id:'J',name:'学生中心',en:'STUDENTS CENTRE',detail:'J 栋 · 学生服务与交流',inner:[-19,17],color:0xd3af57},
 {id:'H',name:'行政中心',en:'ADMINISTRATION',detail:'H 栋 · 行政服务',inner:[19,-19],color:0xd3af57},
 {id:'A',name:'A 栋',en:'BUILDING A',detail:'学院空间与餐厅',ring:2,color:0x9d8baa},
 {id:'B',name:'学者空间',en:'SCHOLAR SPACE',detail:'B 栋 · 学者空间',ring:4,color:0x80a09a},
 {id:'C',name:'创新工场',en:'INNOVATION FACTORY',detail:'C 栋 · 创新工场与浦创汇',ring:6,color:0x9ba48b},
 {id:'F',name:'西餐厅',en:'WESTERN RESTAURANT',detail:'F 栋 · 西餐厅位于 1F',ring:12,color:0xad9b76}
];
export function buildGraph(){const nodes={};const put=(id,x,z)=>nodes[id]={id,x,z,neighbors:[]};const edge=(a,b)=>{nodes[a].neighbors.push(b);nodes[b].neighbors.push(a)};for(let i=0;i<16;i++){const a=i*Math.PI/8;put('r'+i,Math.sin(a)*43,Math.cos(a)*43)}for(let i=0;i<16;i++)edge('r'+i,'r'+((i+1)%16));put('south',24,118);put('southApproach',24,58);edge('south','southApproach');edge('southApproach','r1');put('north',44,-118);put('northApproach',44,-104);edge('north','northApproach');edge('northApproach','r7');for(const p of places){if(p.inner){put(p.id,p.inner[0]+(p.id==='J'?-8:8),p.inner[1]+(p.id==='J'?8:-8));edge(p.id,p.id==='J'?'r14':'r6');}else{const a=p.ring*Math.PI/8;put(p.id,Math.sin(a)*48,Math.cos(a)*48);edge(p.id,'r'+p.ring)}}return nodes}
export const nodes=buildGraph();
export function shortestPath(from,to){const distance=Object.fromEntries(Object.keys(nodes).map(k=>[k,Infinity])),prev={},pending=new Set(Object.keys(nodes));distance[from]=0;while(pending.size){let u=[...pending].reduce((a,b)=>distance[a]<distance[b]?a:b);pending.delete(u);if(u===to||!Number.isFinite(distance[u]))break;for(const v of nodes[u].neighbors){const d=distance[u]+Math.hypot(nodes[u].x-nodes[v].x,nodes[u].z-nodes[v].z);if(d<distance[v]){distance[v]=d;prev[v]=u}}}if(!Number.isFinite(distance[to]))return[];let path=[to];while(path[0]!==from)path.unshift(prev[path[0]]);return path}
export function pathLength(path){return path.slice(1).reduce((s,id,i)=>s+Math.hypot(nodes[id].x-nodes[path[i]].x,nodes[id].z-nodes[path[i]].z),0)}
export function bearing(a,b){return Math.atan2(nodes[b].x-nodes[a].x,nodes[b].z-nodes[a].z)}
export function angleDiff(a,b){return Math.atan2(Math.sin(a-b),Math.cos(a-b))}
export function chooseForward(id,yaw){let best=null,diff=Infinity;for(const n of nodes[id].neighbors){const d=Math.abs(angleDiff(bearing(id,n),yaw));if(d<diff){diff=d;best=n}}return diff<Math.PI*.31?best:null}
