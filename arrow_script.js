const img = document.getElementById('mainImage');
const canvas = document.getElementById('arrowCanvas');
const ctx = canvas.getContext('2d');
const agentIconsContainer = document.getElementById('agentIcons');
const hoverImageContainer = document.getElementById('hoverImageContainer');

const hoverImage = document.getElementById('hoverImage');
const imagePopup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');

let arrows = [];
let activeAgents = [];
let activeSkills = {};

function getUrlParameter(name) {
    name = name.replace(/[$$]/, '\$$').replace(/[$$]/, '\$$');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const imageId = getUrlParameter('id');
const config = imageConfigs[imageId];

if (config) {
    img.src = config.src;
    arrows = config.arrows;
    activeAgents = [...config.agents];
    activeAgents.forEach(agent => {
        activeSkills[agent] = [];
    });
    createAgentIcons(config.agents);
} else {
    console.error('Invalid image ID');
}

function createAgentIcons(agents) {
    agents.forEach(agent => {
        const icon = document.createElement('img');
        icon.src = getAgentIconPath(agent);
        icon.alt = agent;
        icon.id = "agentIcon-" + agent;
        icon.classList.add('agentIcon', 'active');
        icon.onclick = () => toggleAgent(agent);

        const div = document.createElement('div');
        div.classList.add('agentContent');
        div.display = 'flex';
        div.flex_direction = 'column';
        const skillIcons = document.createElement('div');
        skillIcons.id = 'skillIcons-' + agent;
        skillIcons.classList.add('skillIcons')
        div.appendChild(icon);

        Object.keys(skillData[agent]).forEach(key => {
            skill = skillData[agent][key];
            const skillIcon = document.createElement('img');
            skillIcon.src = getSkillIconPath(agent, key);
            skillIcon.alt = agent + '-' + skill;
            skillIcon.classList.add('skillIcon', 'active', key);
            skillIcon.id = 'skillIcon-' + agent + '-' + key;
            skillIcon.onclick = () => toggleSkill(agent, key, true);
            skillIcon.style.borderBottom = 'medium solid ' + skillData[agent][key]['color'];
            skillIcons.appendChild(skillIcon);
            activeSkills[agent].push(key);
        });
        div.appendChild(skillIcons);
        agentIconsContainer.appendChild(div);
    });
}

function getAgentIconElement(agent){
    return document.getElementById("agentIcon-" + agent);
}

function getSkillIconElement(agent, key){
    return document.getElementById('skillIcon-' + agent + '-' + key);
}

function toggleAgent(agent) {
    hasActivated = false;
    if (activeAgents.includes(agent)) {
        deactivateAgent(agent);
    } else {
        activateAgent(agent);
        hasActivated = true;
    }
    Object.keys(skillData[agent]).forEach(key => {
        skill = skillData[agent][key];
        if(hasActivated){
            activateSkill(agent, key);
        }
        else{
            deactivateSkill(agent, key);
        }
    });
    drawArrows();
}
function toggleSkill(agent, key, redraw) {
    console.log(agent, key, activeSkills[agent]);
    if (activeSkills[agent].includes(key)) {
        deactivateSkill(agent, key);
    } else {
        activateSkill(agent, key);
    }
    
    if(activeSkills[agent].length == 0 && activeAgents.includes(agent)){
        deactivateAgent(agent);
    }
    if(activeSkills[agent].length != 0 && !activeAgents.includes(agent)){
        activateAgent(agent);
    }
    if(redraw){
        drawArrows();
    }
}

function activateAgent(agent){
    activeAgents.push(agent);
    agentIcon = getAgentIconElement(agent);
    agentIcon.classList.add('active');
}
function deactivateAgent(agent){
    activeAgents = activeAgents.filter(a => a !== agent);
    agentIcon = getAgentIconElement(agent);
    agentIcon.classList.remove('active');
}
function activateSkill(agent, key){
    activeSkills[agent].push(key);
    skillIcon = getSkillIconElement(agent, key);
    skillIcon.classList.add('active');
}
function deactivateSkill(agent, key){
    activeSkills[agent] = activeSkills[agent].filter(s => s !== key);
    skillIcon = getSkillIconElement(agent, key);
    skillIcon.classList.remove('active');
}

let originalWidth, originalHeight;

img.onload = function() {
    originalWidth = this.naturalWidth;
    originalHeight = this.naturalHeight;
    resizeCanvasAndDrawArrows();
};

function resizeCanvasAndDrawArrows() {
    const container = document.getElementById('imageContainer');
    const ratio = Math.min(container.clientWidth / originalWidth, container.clientHeight / originalHeight);
    
    canvas.width = originalWidth * ratio;
    canvas.height = originalHeight * ratio;
    
    drawArrows();
}


function drawArrows() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;
    console.log("Active Agents: ", activeAgents);
    arrows.forEach(arrow => {
        const scaledArrow = {
            fromx: arrow.fromx * scaleX,
            fromy: arrow.fromy * scaleY,
            tox: arrow.tox * scaleX,
            toy: arrow.toy * scaleY,
            hover: arrow.hover,
            key: arrow.key,
            agent: arrow.agent,
            url: arrow.url,
            hoverImage: arrow.hoverImage
        };
        if(isSkillActive(arrow.agent, arrow.key)){
            drawArrow(scaledArrow);
        }
    });
}

// ウィンドウサイズが変更されたときに再描画
window.addEventListener('resize', resizeCanvasAndDrawArrows);

function drawArrow(arrow) {
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;
	const scale = Math.min(scaleX, scaleY)
    const {fromx, fromy, tox, toy, hover, key, agent} = arrow;
    const headlen = 20 * scale;
    const angle = Math.atan2(toy-fromy, tox-fromx);

    const adjustedTox = tox - headlen * Math.cos(angle);
    const adjustedToy = toy - headlen * Math.sin(angle);

    const arrowColor = skillData[agent][key]['color'] || '#aaaaaa'; // デフォルト色
    const hoverColor = skillData[agent][key]['hoverColor'] || '#00FFFF';



    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(adjustedTox, adjustedToy);
    ctx.strokeStyle = hover ? hoverColor : arrowColor;
    ctx.lineWidth = 4 * scale;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6), toy-headlen*Math.sin(angle-Math.PI/6));
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6), toy-headlen*Math.sin(angle+Math.PI/6));
    ctx.closePath();
    ctx.fillStyle = hover ? hoverColor : arrowColor;
    ctx.fill();

    if (hover) {
        ctx.shadowColor = hoverColor;
        ctx.shadowBlur = 20 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        // ホバー時に画像を表示
        const hoverImage = document.getElementById('hoverImage');
        hoverImage.src = arrow.hoverImage;
        hoverImage.style.display = 'block';
    }	
}

function isSkillActive(agent, key){
    return activeSkills[agent].includes(key);
}

canvas.onmousemove = function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;
	console.log(x / scaleX, y / scaleY);


    let hoveredArrows = arrows.filter(arrow => 
        isSkillActive(arrow.agent, arrow.key) &&
        isPointOnLine(
            arrow.fromx * scaleX, arrow.fromy * scaleY, 
            arrow.tox * scaleX, arrow.toy * scaleY, 
            x, y, 9
        )
    );

    let redraw = false;
    arrows.forEach(arrow => {
        let newHoverState = hoveredArrows.length > 0 && arrow === hoveredArrows[hoveredArrows.length - 1];
        if (arrow.hover !== newHoverState) {
            arrow.hover = newHoverState;
            redraw = true;
        }
    });
	

    if (redraw) {
        drawArrows();
    }
/*
    if (hoveredArrows.length === 0) {
        document.getElementById('hoverImage').style.display = 'none';
    }
*/

    canvas.style.cursor = hoveredArrows.length > 0 ? 'pointer' : 'default';
	
};

canvas.onclick = function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;


    let clickedArrows = arrows.filter(arrow => 
        isSkillActive(arrow.agent, arrow.key) &&
        isPointOnLine(
            arrow.fromx * scaleX, arrow.fromy * scaleY, 
            arrow.tox * scaleX, arrow.toy * scaleY, 
            x, y, 9
        )
    );

    if (clickedArrows.length > 0) {
        //window.location.href = clickedArrows[clickedArrows.length - 1].url;
        //window.location.target = clickedArrows[clickedArrows.length - 1].url;
		window.open(clickedArrows[clickedArrows.length - 1].url, '_blank')
    }
};

function isPointOnLine(x1, y1, x2, y2, px, py, tolerance) {
	const A = px - x1;
	const B = py - y1;
	const C = x2 - x1;
	const D = y2 - y1;

	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	const param = dot / len_sq;

	let xx, yy;

	if (param < 0) {
		xx = x1;
		yy = y1;
	}
	else if (param > 1) {
		xx = x2;
		yy = y2;
	}
	else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}

	const dx = px - xx;
	const dy = py - yy;
	const distance = Math.sqrt(dx * dx + dy * dy);

	return distance <= tolerance;
}


hoverImage.addEventListener('click', function() {
    popupImage.src = this.src;
    imagePopup.style.display = 'flex';
});

imagePopup.addEventListener('click', function() {
    this.style.display = 'none';
});