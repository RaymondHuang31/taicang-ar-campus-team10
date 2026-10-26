import test from 'node:test';
import assert from 'node:assert/strict';
import {nodes,places,shortestPath,pathLength,angleDiff} from '../core.mjs';

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
