import test from 'node:test';
import assert from 'node:assert/strict';
import {nodes,places,facilities,shortestPath,pathLength,angleDiff} from '../core.mjs';

test('destinations reachable from both research starts with valid edges',()=>{
  for(const start of ['north','south']) for(const p of places){
    const route=shortestPath(start,p.id);
    assert.equal(route[0],start);
    assert.equal(route.at(-1),p.id);
    assert.ok(Number.isFinite(pathLength(route)));
    for(let i=1;i<route.length;i++) assert.ok(nodes[route[i-1]].neighbors.includes(route[i]));
  }
});
test('pedestrian route costs symmetric',()=>{
  for(const p of places) assert.ok(Math.abs(pathLength(shortestPath('south',p.id))-pathLength(shortestPath(p.id,'south')))<1e-8);
});
test('turn angle handles wrap across pi',()=>{
  assert.ok(Math.abs(angleDiff(-Math.PI+.1,Math.PI-.1)-.2)<1e-9);
});
test('on-campus sign corrections remain intact',()=>{
  assert.match(places.find(p=>p.id==='E').name,/图书馆/);
  assert.doesNotMatch(places.find(p=>p.id==='D').name,/图书馆/);
  assert.match(places.find(p=>p.id==='F').detail,/未列明/);
  assert.ok(facilities.find(p=>p.id==='sports').x<0 && facilities.find(p=>p.id==='sports').z>0);
  assert.ok(facilities.find(p=>p.id==='pool').x<0 && facilities.find(p=>p.id==='pool').z<0);
});
