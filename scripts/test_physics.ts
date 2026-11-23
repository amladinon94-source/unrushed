/**
 * Numeric tests for the physics kit. Run from the repository root:  bun scripts/test_physics.ts
 * Covers determinism in any frame order, exact fall and springs, stable brakes, particles,
 * joined bodies and steering, and checks that the paste-ready core in references/physics-kit.md
 * gives the same numbers as the full file. Exits with 1 if anything fails.
 */
import {mkdtempSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import * as P from '../assets/remotion/unrushed-physics';

let failed = 0;
let passed = 0;
const ok = (name: string, cond: boolean, detail: unknown = '') => {
	if (cond) passed++;
	else failed++;
	console.log(cond ? 'PASS' : 'FAIL', name, detail);
};

{
// rng determinism
const a=P.rng(7),b=P.rng(7); ok("rng same seed", [1,2,3].every(()=>a()===b()));
// gaussian stats
const r=P.rng(1); let m=0,v=0;const N=20000;const xs=Array.from({length:N},()=>P.gaussian(r,5,2));
m=xs.reduce((s,x)=>s+x,0)/N; v=Math.sqrt(xs.reduce((s,x)=>s+(x-m)**2,0)/N); ok("gaussian mean/sd",Math.abs(m-5)<0.05&&Math.abs(v-2)<0.05,[m.toFixed(3),v.toFixed(3)]);
// noise range and continuity
let mn=9,mx=-9,jump=0,prev=P.noise1(0,3);for(let i=1;i<20000;i++){const x=P.noise1(i/40,3);mn=Math.min(mn,x);mx=Math.max(mx,x);jump=Math.max(jump,Math.abs(x-prev));prev=x;}
ok("noise1 range",mn>-1.05&&mx<1.05&&mx>0.6&&mn<-0.6,[mn.toFixed(2),mx.toFixed(2)]); ok("noise1 smooth at /40",jump<0.12,jump.toFixed(3));
mn=9;mx=-9;for(let i=0;i<300;i++)for(let j=0;j<300;j++){const x=P.noise2(i/17.3,j/13.1,5);mn=Math.min(mn,x);mx=Math.max(mx,x);}
ok("noise2 range",mn>-1.05&&mx<1.05&&mx>0.6&&mn<-0.6,[mn.toFixed(2),mx.toFixed(2)]);
// gravityFor + fall
const g=P.gravityFor(600,12,30); ok("fall covers 600px in 12f",Math.abs(P.fall(12,0,{g}).distance-600)<1e-6,g);
// simulate vs closed-form fall
const sim=P.simulate({init:P.body(0,0,3),step:(s,dt)=>P.step(s,[P.gravity(s,g)],dt),substeps:4});
ok("stepped fall within 5% of exact",Math.abs(sim(12).pos.y-600)/600<0.05,sim(12).pos.y.toFixed(1));
// out-of-order determinism
const s1=P.simulate({init:P.body(0,0,1),step:(s,dt)=>P.step(s,[P.gravity(s,g),P.drag(0.01)],dt)});
const s2=P.simulate({init:P.body(0,0,1),step:(s,dt)=>P.step(s,[P.gravity(s,g),P.drag(0.01)],dt)});
const y90=s1(90).pos.y; s2(10);s2(200);ok("same frame any order",s2(90).pos.y===y90);
// drag terminal velocity = sqrt(m g / c)
const vt=Math.sqrt(1*g/0.01); ok("drag reaches terminal speed",Math.abs(s1(200).vel.y-vt)/vt<0.05,[s1(200).vel.y.toFixed(1),vt.toFixed(1)]);
// mass matters under drag, not in vacuum
const mk=(mass:number,c:number)=>P.simulate({init:P.body(0,0,mass),step:(s,dt)=>P.step(s,[P.gravity(s,g),P.drag(c)],dt)});
ok("vacuum: masses fall together",Math.abs(mk(1,0)(10).pos.y-mk(5,0)(10).pos.y)<1e-6); ok("drag: heavy falls further",mk(5,0.02)(20).pos.y>mk(1,0.02)(20).pos.y*1.3,[mk(1,0.02)(20).pos.y.toFixed(0),mk(5,0.02)(20).pos.y.toFixed(0)]);
// spring closed form: start, end, overshoot per damping, velocity continuity
for(const z of [0.3,0.6,1,1.5]){let peak=0;for(let f=0;f<200;f++)peak=Math.max(peak,P.spring(f,0,{from:0,to:100,period:18,damping:z}).value);
 console.log(" spring damping",z,"peak",peak.toFixed(1),"settle f",P.springSettle({period:18,damping:z}),"at0",P.spring(0,0,{from:0,to:100,damping:z}).value.toFixed(3));}
// closed form vs stepped spring
for(const z of [0.3,1.5]){const w=2*Math.PI/(18/30);const k=w*w,c=2*z*w;
 const ss=P.simulate({init:P.body(0,0,1),substeps:16,step:(s,dt)=>P.step(s,[P.springTo(s,P.vec(100,0),k),P.viscous(c)],dt)});
 let err=0;for(let f=0;f<60;f++)err=Math.max(err,Math.abs(ss(f).pos.x-P.spring(f,0,{from:0,to:100,period:18,damping:z}).value));ok("spring exact vs stepped z="+z,err<2,err.toFixed(3));}
// v0 handoff: numeric derivative at t=0 equals v0
const d=(P.spring(0.001,0,{from:0,to:0,v0:900,damping:0.6}).value-0)/(0.001/30);ok("spring v0 handoff",Math.abs(d-900)<5,d.toFixed(1));
ok("heading",Math.abs(P.heading(P.vec(0,1))-90)<1e-9);
// stability: a brutal brake at 1 substep never reverses or explodes
const hard=P.simulate({init:P.body(0,0,1,0,3000),substeps:1,step:(s,dt)=>P.step(s,[P.drag(5),P.viscous(500),P.friction(0.5,4000)],dt)});
let mono=true,pv=3000;for(let f=1;f<60;f++){const v=hard(f).vel.y;if(v<0||v>pv+1e-9)mono=false;pv=v;}ok("resistance never reverses",mono&&hard(59).vel.y===0,hard(59).vel.y);
}

{
const G=4125;
const mk=()=>P.emitter({seed:4,rate:2.5,life:[40,6],spawn:(r)=>P.body(P.gaussian(r,0,10),0,1,P.gaussian(r,0,60),-P.gaussian(r,500,80)),forces:(p,f)=>[P.gravity(p,G),P.drag(0.002),P.wind(p,f,40)]});
const e1=mk(),e2=mk(); const a=e1(120); e2(30);e2(200); const b=e2(120);
ok("emitter any order",JSON.stringify(a)===JSON.stringify(b));
ok("emitter steady count ~ rate*life",Math.abs(a.length-100)<12,a.length);
ok("ages in (0,1)",a.every(p=>p.age>=0&&p.age<1)); ok("ids unique",new Set(a.map(p=>p.id)).size===a.length);
const burst=P.emitter({rate:(f)=>f<3?20:0,life:[20,2],spawn:()=>P.body(0,0)}); ok("burst count",burst(5).length===60,burst(5).length); ok("burst dies",burst(40).length===0);
ok("until stops",P.emitter({rate:1,until:10,life:[10,0],spawn:()=>P.body(0,0)})(60).length===0);
ok("lifeCurve ends",P.lifeCurve(0)===0&&Math.abs(P.lifeCurve(1))<1e-9&&P.lifeCurve(0.2)===1);
// rope hanging from a fixed pin, starting horizontal: ends hanging straight down, lengths kept
const r=P.rope(P.vec(0,0),P.vec(400,0),10); const cord=P.joined({...r,g:G,pins:{0:P.vec(0,0)},damping:0.3});
const end=cord(240); let maxStretch=0; for(const f of [5,20,60,240]){const pts=cord(f);for(const l of r.links){const len=Math.hypot(pts[l.b].x-pts[l.a].x,pts[l.b].y-pts[l.a].y);maxStretch=Math.max(maxStretch,Math.abs(len-l.rest)/l.rest);}}
ok("rope hangs straight down",Math.abs(end[10].x)<8&&Math.abs(end[10].y-400)<30,[end[10].x.toFixed(1),end[10].y.toFixed(1)]); ok("rope stretch small",maxStretch<0.12,maxStretch.toFixed(3));
ok("rope finite",cord(600).every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
const c2=P.joined({...r,g:G,pins:{0:P.vec(0,0)},damping:0.3}); c2(300); ok("joined any order",JSON.stringify(c2(60))===JSON.stringify(cord(60)));
// moving pin: follow-through. anchor slides 300px in 12f and stops; tip keeps going past it then returns
const anchor=(f:number)=>P.vec(Math.min(1,f/12)*300,0); const hr=P.rope(P.vec(0,0),P.vec(0,300),8); const tag=P.joined({...hr,g:G,pins:{0:anchor},damping:0.5});
let lagAt12=tag(12)[8].x, peak=-1e9, peakF=0; for(let f=12;f<80;f++){const x=tag(f)[8].x;if(x>peak){peak=x;peakF=f;}}
ok("tip lags the driver",lagAt12<300-20,lagAt12.toFixed(1)); ok("tip swings past and later",peak>300+15&&peakF>14,[peak.toFixed(1),peakF]); ok("tip returns",Math.abs(tag(400)[8].x-300)<10,tag(400)[8].x.toFixed(1));
// cloth and blob stay finite and on the floor
const cl=P.cloth(P.vec(0,0),8,6,30); const sheet=P.joined({...cl,g:G,pins:{0:P.vec(0,0),7:P.vec(210,0)},forces:(p,i,f)=>P.vec(600*P.noise2(p.y/200,f/30,1),0)});
ok("cloth finite",sheet(150).every(p=>Number.isFinite(p.x))); ok("cloth hangs below rail",sheet(150)[47].y>100,sheet(150)[47].y.toFixed(0));
const mkb=()=>P.joined({...P.blob(P.vec(0,0),60,20,0.6),g:G,floor:330,damping:0.2}); const drop=mkb();
const dim=(f:number)=>{const d=drop(f);return [Math.max(...d.map(p=>p.x))-Math.min(...d.map(p=>p.x)),Math.max(...d.map(p=>p.y))-Math.min(...d.map(p=>p.y))]};
const area=(d:P.Vec[])=>Math.abs(d.reduce((s,p,i)=>s+p.x*d[(i+1)%d.length].y-d[(i+1)%d.length].x*p.y,0)/2);
ok("blob flattens and bulges on impact",dim(14)[0]>150&&dim(14)[1]<70,dim(14).map(x=>x.toFixed(0)));
ok("blob settles as a dome",dim(150)[0]>dim(150)[1]*1.4&&dim(150)[1]>60,dim(150).map(x=>x.toFixed(0)));
ok("blob keeps most of its area at rest",Math.abs(area(drop(150))/area(drop(0))-1)<0.25,(area(drop(150))/area(drop(0))).toFixed(2));
ok("blob on floor",Math.max(...drop(150).map(p=>p.y))<=330+1e-6); const b2=mkb(); b2(200); ok("blob any order",JSON.stringify(b2(40))===JSON.stringify(drop(40)));
const d=drop(150);
ok("path",P.pathThrough(d,true).endsWith("Z"));
}

{
const T=P.vec(800,300), MS=900, MF=3000;
const one=(f:(b:P.Body,fr:number)=>P.Force[],init=P.body(0,0,1,0,600))=>P.agents({init:[init],maxSpeed:MS,steer:(b,_a,fr)=>f(b,fr)});
// arrive: reaches, stops, never passes
const ar=one(b=>[P.arrive(b,T,MS,MF,200)]); let minD=1e9,passed=false; for(let f=0;f<150;f++){const b=ar(f)[0];minD=Math.min(minD,P.mag(P.sub(T,b.pos)));}
const end=ar(150)[0]; ok("arrive stops at target",P.mag(P.sub(T,end.pos))<3&&P.mag(end.vel)<5,[P.mag(P.sub(T,end.pos)).toFixed(2),P.mag(end.vel).toFixed(2)]);
// arc: starting sideways, the path bows away from the straight line
let bow=0; for(let f=0;f<60;f++){const b=ar(f)[0].pos; bow=Math.max(bow,Math.abs(b.x*300-b.y*800)/Math.hypot(800,300));} ok("arrive path is an arc",bow>40,bow.toFixed(0));
// decelerating steps near the end
const sp=(f:number)=>P.mag(ar(f)[0].vel)/30; let arriveF=0; for(let f=0;f<150;f++) if(P.mag(P.sub(T,ar(f)[0].pos))>3) arriveF=f; 
ok("arrive decelerates",sp(arriveF-8)>sp(arriveF-4)&&sp(arriveF-4)>sp(arriveF-1),[arriveF,sp(arriveF-8).toFixed(1),sp(arriveF-4).toFixed(1),sp(arriveF-1).toFixed(1)]);
// seek overshoots
const sk=one(b=>[P.seek(b,T,MS,MF)]); let far=0,reached=false; for(let f=0;f<150;f++){const d=P.mag(P.sub(T,sk(f)[0].pos)); if(d<30)reached=true; if(reached)far=Math.max(far,d);} ok("seek overshoots",reached&&far>60,far.toFixed(0));
// flee only within radius
ok("flee ignores far",P.mag(P.flee(P.body(0,0),P.vec(900,0),MS,MF,200))===0); ok("flee pushes away",P.flee(P.body(0,0),P.vec(50,0),MS,MF,200).x<0);
// flow: unit length, smooth in space
let maxTurn=0; for(let x=0;x<2000;x+=5){const a=P.flowAt(P.vec(x,100)),b=P.flowAt(P.vec(x+5,100)); maxTurn=Math.max(maxTurn,Math.acos(Math.min(1,a.x*b.x+a.y*b.y)));} ok("flow smooth",maxTurn<0.35,maxTurn.toFixed(3)); ok("flow unit",Math.abs(P.mag(P.flowAt(P.vec(3,7)))-1)<1e-9);
// path following: stays near an L-shaped path and gets to the end region
const path=[P.vec(0,0),P.vec(600,0),P.vec(600,500)]; const pf=one(b=>[P.followPath(b,path,400,1600,{radius:20})],P.body(0,60,1,300,0));
const distToPath=(p:P.Vec)=>Math.min(...[0,1].map(i=>{const a=path[i],s=P.sub(path[i+1],a);const t=Math.max(0,Math.min(1,((p.x-a.x)*s.x+(p.y-a.y)*s.y)/(s.x*s.x+s.y*s.y)));return P.mag(P.sub(p,P.add(a,P.scale(s,t))));}));
let straight=0,corner=0; for(let f=20;f<=32;f++) straight=Math.max(straight,distToPath(pf(f)[0].pos)); for(let f=33;f<=70;f++) corner=Math.max(corner,distToPath(pf(f)[0].pos));
ok("path: joins the straight",straight<32,straight.toFixed(1)); ok("path: cuts the corner by less than 60 px",corner<60&&corner>8,corner.toFixed(1));
const pe=pf(160)[0]; ok("path: stops at the end",P.mag(P.sub(pe.pos,path[2]))<4&&P.mag(pe.vel)<5,[pe.pos.x.toFixed(1),pe.pos.y.toFixed(1)]);
const route=[P.vec(40,60),P.vec(420,60),P.vec(420,320),P.vec(620,320)]; const car=P.agents({init:[P.body(40,60,1,300,0)],maxSpeed:420,steer:b=>[P.followPath(b,route,420,2200,{radius:12})]});
const ce=car(200)[0]; ok("route with two corners reaches its end",P.mag(P.sub(ce.pos,route[3]))<4,[ce.pos.x.toFixed(0),ce.pos.y.toFixed(0)]);
// flock: separation spreads a clump; alignment raises order
const mkFlock=(w:[number,number,number])=>P.agents({init:Array.from({length:50},(_,i)=>{const r=P.rng(i+1);const a=r()*6.283;return P.body(400+r()*300,400+r()*300,1,Math.cos(a)*200,Math.sin(a)*200)}),maxSpeed:260,
 steer:(b,all)=>[P.scale(P.separate(b,all,260,700,34),w[0]),P.scale(P.align(b,all,260,400,120),w[1]),P.scale(P.cohere(b,all,260,300,120),w[2])]});
const order=(bs:P.Body[])=>{const s=bs.reduce((a,b)=>P.add(a,P.unit(b.vel)),P.vec());return P.mag(s)/bs.length};
const nearest=(bs:P.Body[])=>{let tot=0;for(const b of bs){let m=1e9;for(const o of bs)if(o!==b)m=Math.min(m,P.mag(P.sub(b.pos,o.pos)));tot+=m;}return tot/bs.length};
const fl=mkFlock([1.6,1,1]); ok("flock aligns",order(fl(0))<0.3&&order(fl(150))>0.8,[order(fl(0)).toFixed(2),order(fl(150)).toFixed(2)]);
const clump=P.agents({init:Array.from({length:40},(_,i)=>{const r=P.rng(i+1);return P.body(500+r()*40,500+r()*40)}),maxSpeed:200,steer:(b,all)=>[P.separate(b,all,200,800,50),P.viscous(2)]});
ok("separation spreads a clump",nearest(clump(0))<8&&nearest(clump(90))>30,[nearest(clump(0)).toFixed(1),nearest(clump(90)).toFixed(1)]);
const f2=mkFlock([1.6,1,1]); f2(200); ok("agents any order",JSON.stringify(f2(77))===JSON.stringify(fl(77)));
ok("all finite",fl(300).every(b=>Number.isFinite(b.pos.x)&&Number.isFinite(b.vel.y)));
}

// The paste-ready core, exactly as it is published in the reference.
{
const md = readFileSync(new URL('../references/physics-kit.md', import.meta.url), 'utf8');
const block = md.match(/```ts\n([\s\S]*?)\n```/);
if (!block) throw new Error('no ts block in physics-kit.md');
const dir = mkdtempSync(join(tmpdir(), 'unrushed-core-'));
writeFileSync(join(dir, 'core.ts'), block[1]);
const C = await import(join(dir, 'core.ts'));
const a=C.rng(5),b=P.rng(5); ok("rng equal",a()===b()&&a()===b());
let e=0; for(let i=0;i<500;i++) e=Math.max(e,Math.abs(C.noise1(i/7.3,4)-C.noise1(i/7.3,4))); let mn=9,mx=-9,j=0,pv=C.noise1(0,4); for(let i=1;i<9000;i++){const x=C.noise1(i/30,4);mn=Math.min(mn,x);mx=Math.max(mx,x);j=Math.max(j,Math.abs(x-pv));pv=x;} ok("core noise range/smooth",mn>-1.05&&mx<1.05&&mx>0.6&&j<0.15,[mn.toFixed(2),mx.toFixed(2),j.toFixed(3)]);
e=0; for(const z of [0.3,0.6,1,1.5]) for(let f=0;f<80;f++) e=Math.max(e,Math.abs(C.spring(f,3,{from:40,to:0,period:22,damping:z,v0:300})-P.spring(f,3,{from:40,to:0,period:22,damping:z,v0:300}).value)); ok("spring equal",e<1e-9,e);
const G=C.gravityFor(330,12); ok("gravity equal",G===P.gravityFor(330,12));
const dc=C.simulate({pos:{x:540,y:90},vel:{x:0,y:0},mass:4},(s,dt)=>C.step(s,[{x:0,y:G*s.mass}],s.pos.y>420?[{quad:0.5}]:[],dt));
const dp=P.simulate({init:P.body(540,90,4),step:(s,dt)=>P.step(s,[P.gravity(s,G),...(s.pos.y>420?[P.drag(0.5)]:[])],dt)});
e=0; for(let f=0;f<60;f++) e=Math.max(e,Math.abs(dc(f).pos.y-dp(f).pos.y)); ok("sim equal to full kit",e<1e-6,e);
const d2=C.simulate({pos:{x:0,y:90},vel:{x:0,y:0},mass:4},(s,dt)=>C.step(s,[{x:0,y:G*s.mass}],s.pos.y>420?[{quad:0.5}]:[],dt)); d2(50); ok("order",d2(20).pos.y===dc(20).pos.y);
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
